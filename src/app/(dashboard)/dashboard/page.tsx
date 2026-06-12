"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center space-y-4 items-center flex-col mx-auto h-full">
      <h1 className="text-4xl font-semibold">Welcome {session?.user?.name}</h1>
      <p>Dashboard under development!!</p>
      <Link href="/books">
        <Button className="bg-teal-500 text-white hover:bg-teal-600">
          Access Books
        </Button>
      </Link>
    </div>
  );
}
