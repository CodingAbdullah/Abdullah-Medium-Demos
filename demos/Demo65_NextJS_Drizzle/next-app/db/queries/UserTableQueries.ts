import { db } from "../database";
import { Users } from "../schema/User";
import { eq } from "drizzle-orm";

// Very simple and easy to understand queries for working with the User table
// Create
export async function createUser(name: string, email: string) {
  await db.insert(Users).values({ name, email });
}

// Read
export async function getUserByEmail(email: string) {
  return await db.select().from(Users).where(eq(Users.email, email));
}

// Update
export async function updateUserName(id: number, newName: string) {
  await db.update(Users).set({ name: newName }).where(eq(Users.id, id));
}

// Delete
export async function deleteUser(id: number) {
  await db.delete(Users).where(eq(Users.id, id));
}
