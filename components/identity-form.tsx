"use client";

import { useState } from "react";
import { ArrowRight, Building2, MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Identity } from "@/lib/types";

type Props = {
  onComplete: (identity: Identity) => void;
};

export function IdentityForm({ onComplete }: Props) {
  const [nickname, setNickname] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!nickname.trim() || !officeLocation.trim()) return;

    onComplete({
      nickname: nickname.trim(),
      officeLocation: officeLocation.trim(),
      deviceId: crypto.randomUUID(),
    });
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="w-full max-w-sm">
        <div className="mb-10">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-red-600 text-white">
            <MoonStar aria-hidden="true" size={22} />
          </div>
          <p className="mb-2 text-sm font-semibold text-red-600">?????</p>
          <h1 className="text-3xl font-bold tracking-normal text-zinc-950">
            ????????????
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            ?????????????????
          </p>
        </div>

        <form className="space-y-5" onSubmit={submit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">?????</span>
            <Input
              autoFocus
              maxLength={20}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="?????"
              value={nickname}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">????</span>
            <div className="relative">
              <Building2
                aria-hidden="true"
                className="absolute left-3 top-3 text-zinc-400"
                size={18}
              />
              <Input
                className="pl-10"
                maxLength={40}
                onChange={(event) => setOfficeLocation(event.target.value)}
                placeholder="???????"
                value={officeLocation}
              />
            </div>
          </label>
          <Button
            className="w-full"
            disabled={!nickname.trim() || !officeLocation.trim()}
            type="submit"
          >
            ??????
            <ArrowRight aria-hidden="true" size={17} />
          </Button>
        </form>
      </section>
    </main>
  );
}
