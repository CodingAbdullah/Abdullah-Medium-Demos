import { createChutes } from "@chutes-ai/ai-sdk-provider";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Set up the Chutes AI provider
// Select a chutes model to work with
const chutes = createChutes({
  apiKey: process.env.CHUTES_API_KEY!
});

export async function POST() {
  const result = await generateText({
    model: await chutes("https://chutes-deepseek-ai-deepseek-v3.chutes.ai"),
    prompt: "Generate me a simple HTML page document"
  });

  return NextResponse.json({ text: result.text });
}
