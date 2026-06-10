"use client";

import { useEffect, useState } from "react";
import { LogOut, MoonStar, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateInvitationDialog } from "@/components/create-invitation-dialog";
import { InvitationCard } from "@/components/invitation-card";
import {
  createInvitation,
  getInvitations,
  joinInvitation,
} from "@/lib/invitations";
import type { Identity, Invitation, NewInvitation } from "@/lib/types";

type Props = {
  identity: Identity;
  onReset: () => void;
};

export function InvitationList({ identity, onReset }: Props) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joiningId, setJoiningId] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setInvitations(
        await getInvitations(identity.officeLocation, identity.deviceId),
      );
    } catch {
      setError("?????????????");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [identity.deviceId, identity.officeLocation]);

  async function create(input: NewInvitation) {
    await createInvitation(identity, input);
    await load();
  }

  async function join(id: string) {
    setJoiningId(id);
    setError("");
    try {
      await joinInvitation(id, identity);
      await load();
    } catch {
      setError("???????????");
    } finally {
      setJoiningId("");
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-white">
              <MoonStar aria-hidden="true" size={18} />
            </span>
            <div>
              <p className="text-sm font-bold">????</p>
              <p className="text-xs text-zinc-500">{identity.officeLocation}</p>
            </div>
          </div>
          <Button
            aria-label="????"
            onClick={onReset}
            title="????"
            variant="ghost"
          >
            <LogOut aria-hidden="true" size={17} />
            <span className="hidden sm:inline">{identity.nickname}</span>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-9">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-red-600">
              {identity.officeLocation}
            </p>
            <h1 className="text-2xl font-bold">?????</h1>
          </div>
          <Button onClick={() => setDialogOpen(true)} variant="accent">
            <Plus aria-hidden="true" size={17} />
            <span className="hidden sm:inline">????</span>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                className="h-56 animate-pulse rounded-md border bg-white"
                key={item}
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border bg-white p-8 text-center">
            <p className="text-sm text-zinc-600">{error}</p>
            <Button className="mt-4" onClick={load} variant="outline">
              <RefreshCw aria-hidden="true" size={16} />
              ??
            </Button>
          </div>
        ) : invitations.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {invitations.map((invitation) => (
              <InvitationCard
                invitation={invitation}
                joining={joiningId === invitation.id}
                key={invitation.id}
                onJoin={join}
              />
            ))}
          </div>
        ) : (
          <div className="border-y bg-white px-5 py-16 text-center">
            <p className="font-semibold">?????????</p>
            <p className="mt-2 text-sm text-zinc-500">?????????</p>
          </div>
        )}
      </div>
      <CreateInvitationDialog
        onClose={() => setDialogOpen(false)}
        onSubmit={create}
        open={dialogOpen}
      />
    </main>
  );
}
