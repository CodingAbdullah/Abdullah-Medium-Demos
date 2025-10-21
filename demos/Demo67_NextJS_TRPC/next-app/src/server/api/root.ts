import { createTRPCRouter } from './trpc';
import { usersRouter } from './routers/users';

// Router for working with the User object inside the Supabase database
export const appRouter = createTRPCRouter({
  users: usersRouter
});

export type AppRouter = typeof appRouter;