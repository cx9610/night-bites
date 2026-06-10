import { supabase } from "@/lib/supabase";
import type { Identity, Invitation, NewInvitation } from "@/lib/types";

type StoredInvitation = Omit<Invitation, "joined" | "participantCount"> & {
  participantDeviceIds: string[];
};

const STORAGE_KEY = "night-bites-invitations";
const seedInvitations: StoredInvitation[] = [
  {
    id: "demo-1",
    creatorDeviceId: "demo-device-1",
    creatorNickname: "??",
    officeLocation: "????",
    destination: "????",
    meetingTime: new Date(Date.now() + 35 * 60_000).toISOString(),
    meetingPlace: "????",
    status: "open",
    participantDeviceIds: ["demo-1a", "demo-1b", "demo-1c"],
  },
  {
    id: "demo-2",
    creatorDeviceId: "demo-device-2",
    creatorNickname: "Mia",
    officeLocation: "????",
    destination: "??????",
    meetingTime: new Date(Date.now() + 70 * 60_000).toISOString(),
    meetingPlace: "????",
    status: "open",
    participantDeviceIds: ["demo-2a", "demo-2b"],
  },
];

function getStoredInvitations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored) as StoredInvitation[];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedInvitations));
  return seedInvitations;
}

function saveStoredInvitations(items: StoredInvitation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function getInvitations(
  officeLocation: string,
  deviceId: string,
): Promise<Invitation[]> {
  if (!supabase) {
    return getStoredInvitations()
      .filter(
        (item) =>
          item.officeLocation === officeLocation && item.status === "open",
      )
      .map((item) => ({
        ...item,
        participantCount: item.participantDeviceIds.length,
        joined: item.participantDeviceIds.includes(deviceId),
      }));
  }

  const { data, error } = await supabase
    .from("invitations")
    .select("*, participants(device_id)")
    .eq("office_location", officeLocation)
    .eq("status", "open")
    .order("meeting_time", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((item) => ({
    id: item.id,
    creatorDeviceId: item.creator_device_id,
    creatorNickname: item.creator_nickname,
    officeLocation: item.office_location,
    destination: item.destination,
    meetingTime: item.meeting_time,
    meetingPlace: item.meeting_place,
    status: item.status,
    participantCount: item.participants.length,
    joined: item.participants.some(
      (participant: { device_id: string }) =>
        participant.device_id === deviceId,
    ),
  }));
}

export async function createInvitation(
  identity: Identity,
  input: NewInvitation,
) {
  if (!supabase) {
    const items = getStoredInvitations();
    const invitation: StoredInvitation = {
      id: crypto.randomUUID(),
      creatorDeviceId: identity.deviceId,
      creatorNickname: identity.nickname,
      officeLocation: identity.officeLocation,
      destination: input.destination,
      meetingTime: input.meetingTime,
      meetingPlace: input.meetingPlace,
      status: "open",
      participantDeviceIds: [identity.deviceId],
    };
    saveStoredInvitations([invitation, ...items]);
    return;
  }

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      creator_device_id: identity.deviceId,
      creator_nickname: identity.nickname,
      office_location: identity.officeLocation,
      destination: input.destination,
      meeting_time: input.meetingTime,
      meeting_place: input.meetingPlace,
    })
    .select("id")
    .single();
  if (error) throw error;

  const { error: joinError } = await supabase.from("participants").insert({
    invitation_id: data.id,
    device_id: identity.deviceId,
    nickname: identity.nickname,
  });
  if (joinError) throw joinError;
}

export async function joinInvitation(
  invitationId: string,
  identity: Identity,
) {
  if (!supabase) {
    const items = getStoredInvitations();
    const invitation = items.find((item) => item.id === invitationId);
    if (!invitation || invitation.status !== "open") {
      throw new Error("Invitation unavailable");
    }
    if (!invitation.participantDeviceIds.includes(identity.deviceId)) {
      invitation.participantDeviceIds.push(identity.deviceId);
      saveStoredInvitations(items);
    }
    return;
  }

  const { error } = await supabase.from("participants").insert({
    invitation_id: invitationId,
    device_id: identity.deviceId,
    nickname: identity.nickname,
  });
  if (error && error.code !== "23505") throw error;
}
