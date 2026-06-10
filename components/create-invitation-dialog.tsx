"use client";

import { useState } from "react";
import { Clock3, MapPin, Utensils, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewInvitation } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewInvitation) => Promise<void>;
};

function defaultTime() {
  const date = new Date(Date.now() + 30 * 60_000);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function CreateInvitationDialog({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [destination, setDestination] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [meetingTime, setMeetingTime] = useState(defaultTime);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!destination.trim() || !meetingPlace.trim() || !meetingTime) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        destination: destination.trim(),
        meetingPlace: meetingPlace.trim(),
        meetingTime: new Date(meetingTime).toISOString(),
      });
      setDestination("");
      setMeetingPlace("");
      setMeetingTime(defaultTime());
      onClose();
    } catch {
      setError("???????????");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-0 sm:place-items-center sm:p-5"
      role="dialog"
    >
      <section className="w-full rounded-t-md bg-white p-5 shadow-lift sm:max-w-md sm:rounded-md sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-red-600">????</p>
            <h2 className="mt-1 text-xl font-bold">???????</h2>
          </div>
          <Button
            aria-label="??"
            className="h-9 w-9 px-0"
            onClick={onClose}
            type="button"
            variant="ghost"
          >
            <X aria-hidden="true" size={18} />
          </Button>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">???</span>
            <div className="relative">
              <Utensils className="absolute left-3 top-3.5 text-zinc-400" size={17} />
              <Input
                autoFocus
                className="pl-10"
                onChange={(event) => setDestination(event.target.value)}
                placeholder="???????"
                value={destination}
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">????</span>
            <div className="relative">
              <Clock3 className="absolute left-3 top-3.5 text-zinc-400" size={17} />
              <Input
                className="pl-10"
                min={new Date().toISOString().slice(0, 16)}
                onChange={(event) => setMeetingTime(event.target.value)}
                type="datetime-local"
                value={meetingTime}
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">????</span>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-zinc-400" size={17} />
              <Input
                className="pl-10"
                onChange={(event) => setMeetingPlace(event.target.value)}
                placeholder="???????"
                value={meetingPlace}
              />
            </div>
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            className="w-full"
            disabled={
              submitting ||
              !destination.trim() ||
              !meetingPlace.trim() ||
              !meetingTime
            }
            type="submit"
            variant="accent"
          >
            {submitting ? "???..." : "????"}
          </Button>
        </form>
      </section>
    </div>
  );
}
