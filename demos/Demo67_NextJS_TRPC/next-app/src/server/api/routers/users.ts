import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../../db';
import { users } from '../../../db/schema';

// User router for working with the different CRUD operations
export const usersRouter = createTRPCRouter({
  // Create User
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email()
      })
    )
    .mutation(async ({ input }) => {
      const [user] = await db
        .insert(users)
        .values({
          name: input.name,
          email: input.email
        })
        .returning();
      
      return user;
    }),

  // Get All Users
  getAll: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),

  // Get User by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, input.id));
      
      return user || null;
    }),

  // Update user
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const updateData: any = { updatedAt: new Date() };
      
      if (input.name !== undefined) updateData.name = input.name;
      if (input.email !== undefined) updateData.email = input.email;

      const [updatedUser] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, input.id))
        .returning();
      
      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const [deletedUser] = await db
        .delete(users)
        .where(eq(users.id, input.id))
        .returning();
      
      return deletedUser;
    })
});