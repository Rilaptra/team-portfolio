// src/app/api/ai/route.ts
import { Content, GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const parsedBody = await parseBody(req);

  // validate request is from website not other
  console.log(req.headers.get("origin"));
  if (req.headers.get("origin") !== "https://shr-project.vercel.app")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!parsedBody)
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    apiVersion: "v1beta",
  });

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: parsedBody.history,
    config: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      systemInstruction: "",
    },
  });

  const response = await chat.sendMessage(parsedBody.query);
  if (!response.text) return NextResponse.json({ error: "No response" });

  return NextResponse.json({ response: response.text });
}

interface RequestBody {
  history: Content[];
  query: { message: string };
}
async function parseBody(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi sederhana: pastikan history adalah array dan query adalah string
    if (
      !body ||
      typeof body.query !== "string" ||
      !Array.isArray(body.history)
    ) {
      return null; // Mengembalikan null jika format tidak valid
    }

    if (typeof body.query === "string" || !("message" in body.query)) {
      body.query = { message: body.query };
    }

    // Memberikan tipe yang benar pada body yang sudah divalidasi
    return body as RequestBody;
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return null; // Mengembalikan null jika JSON tidak valid
  }
}
