// src/app/api/ai/route.ts
import { Content, GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const parsedBody = await parseBody(req);
    // const origin = req.headers.get("origin");
    // validate request is from website not other
    // if (origin !== "https://shr-project.vercel.app")
    //   return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    if (!parsedBody)
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      apiVersion: "v1beta",
    });

    const chat = ai.chats.create({
      model: "gemma-3-27b-it",
      history: [
        {
          role: "user",
          parts: [{ text: process.env.SYSTEM_PROMPT }],
        },
        ...parsedBody.history,
      ],
      config: {
        // thinkingConfig: {
        //   thinkingBudget: -1,
        // },
        // systemInstruction: process.env.SYSTEM_PROMPT,
      },
    });
    const response = await chat.sendMessage(parsedBody.query);
    if (!response.text) return NextResponse.json({ error: "No response" });

    return NextResponse.json({ response: response.text });
  } catch (err) {
    console.error((err as Error).message);
    const parsedError = JSON.parse((err as Error).message);
    const code = parsedError?.error?.code;
    if (code === 429) {
      return NextResponse.json(
        {
          message: "API rate limit exceeded. Please try again later.",
          retryDelay: Number(
            parsedError?.error?.details[2]?.retryDelay.replace("s", ""),
          ),
        },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
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
      typeof body.query !== "object" ||
      !Array.isArray(body.history)
    ) {
      return null; // Mengembalikan null jika format tidak valid
    }

    // Memberikan tipe yang benar pada body yang sudah divalidasi
    return body as RequestBody;
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return null; // Mengembalikan null jika JSON tidak valid
  }
}
