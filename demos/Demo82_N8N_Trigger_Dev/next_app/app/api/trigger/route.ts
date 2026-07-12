import { tasks } from "@trigger.dev/sdk";
import { NextRequest, NextResponse } from "next/server";
import type { exampleTask } from "@/trigger/example-task";

// Kicks off the example Trigger.dev background task and returns the run
// handle so the client can look up (or poll) its status
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const handle = await tasks.trigger<typeof exampleTask>("example-task", {
    name: name || "World",
  });

  return NextResponse.json(handle);
}
