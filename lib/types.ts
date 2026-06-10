export type Identity = {
  nickname: string;
  officeLocation: string;
  deviceId: string;
};

export type Invitation = {
  id: string;
  creatorDeviceId: string;
  creatorNickname: string;
  officeLocation: string;
  destination: string;
  meetingTime: string;
  meetingPlace: string;
  status: "open" | "departed" | "cancelled";
  participantCount: number;
  joined: boolean;
};

export type NewInvitation = {
  destination: string;
  meetingTime: string;
  meetingPlace: string;
};
