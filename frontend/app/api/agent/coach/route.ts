import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY?.trim();
    if (!groqApiKey) {
      return NextResponse.json(
        { advice: "Error: GROQ_API_KEY environment variable is missing." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a career and technical coach for Panaversity students. Offer guidance on how to build a portfolio, learn faster, and stay ethical in AI."
          },
          { role: "user", content: message }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Groq: ${response.statusText}`);
    }

    const data = await response.json();
    const advice = data.choices?.[0]?.message?.content || "No advice generated.";

    return NextResponse.json({ advice });
  } catch (error: any) {
    console.error("Coach API error:", error);
    return NextResponse.json({ advice: "I'm sorry, I'm having trouble providing coaching advice right now. Please try again soon." }, { status: 500 });
  }
}
