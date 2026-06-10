import { Clock3, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Invitation } from "@/lib/types";

type Props = {
  invitation: Invitation;
  joining: boolean;
  onJoin: (id: string) => void;
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function InvitationCard({ invitation, joining, onJoin }: Props) {
  return (
    <article className="rounded-md border bg-white p-5 transition-shadow hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium text-zinc-500">
            {invitation.creatorNickname} ??
          </p>
          <h2 className="truncate text-lg font-bold text-zinc-950">
            {invitation.destination}
          </h2>
        </div>
        <span className="shrink-0 rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
          ???
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-zinc-600">
        <p className="flex items-center gap-2">
          <Clock3 aria-hidden="true" className="text-zinc-400" size={16} />
          ?? {formatTime(invitation.meetingTime)}
        </p>
        <p className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="text-zinc-400" size={16} />
          {invitation.meetingPlace} ??
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <p className="flex items-center gap-2 text-sm text-zinc-500">
          <Users aria-hidden="true" size={16} />
          {invitation.participantCount} ????
        </p>
        <Button
          disabled={invitation.joined || joining}
          onClick={() => onJoin(invitation.id)}
          variant="outline"
        >
          {invitation.joined ? "???" : joining ? "???..." : "???"}
        </Button>
      </div>
    </article>
  );
}
