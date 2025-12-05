import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

// POST request function to create a new article
export async function POST(req: Request) {
  const body = await req.json();

  const article = {
    id: randomUUID(),
    title: body.title,
    imageUrl: body.imageUrl,
  };

  db.push(article); // Save article to mock database
  return NextResponse.json(article);
}

export async function GET() {
  return NextResponse.json(db);
}
