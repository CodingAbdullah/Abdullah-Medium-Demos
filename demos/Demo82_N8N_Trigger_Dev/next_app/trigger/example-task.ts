import { logger, task, wait } from "@trigger.dev/sdk";

// The most basic possible Trigger.dev background task: it waits a couple of
// seconds (simulating slow work like a report export or an email batch)
// and returns a small payload. Trigger it from a Next.js route handler with
// tasks.trigger("example-task", { name })
export const exampleTask = task({
  id: "example-task",
  run: async (payload: { name: string }) => {
    logger.info("Starting example task", { payload });

    await wait.for({ seconds: 3 });

    return {
      message: `Hello, ${payload.name}! Your task finished.`,
      completedAt: new Date().toISOString(),
    };
  },
});
