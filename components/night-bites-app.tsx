"use client";

import { useEffect, useState } from "react";
import { IdentityForm } from "@/components/identity-form";
import { InvitationList } from "@/components/invitation-list";
import type { Identity } from "@/lib/types";

const STORAGE_KEY = "night-bites-identity";

export function NightBitesApp() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setIdentity(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  function saveIdentity(value: Identity) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    setIdentity(value);
  }

  function resetIdentity() {
    localStorage.removeItem(STORAGE_KEY);
    setIdentity(null);
  }

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }

  return identity ? (
    <InvitationList identity={identity} onReset={resetIdentity} />
  ) : (
    <IdentityForm onComplete={saveIdentity} />
  );
}
