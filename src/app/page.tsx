"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-muted flex justify-center space-y-4 items-center h-screen flex-col">
      <h1 className="text-4xl font-semibold">U are not intruder?</h1>
      <Link href="/dashboard">
        <Button className="bg-teal-500 text-white hover:bg-teal-600">
          Access Dashboard
        </Button>
      </Link>
    </div>
  );
}
