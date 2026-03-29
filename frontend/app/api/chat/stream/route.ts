export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message, context, history } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY?.trim();
    if (!groqApiKey) {
      const errorResponse = new TextEncoder().encode(`data: {"error": "GROQ_API_KEY environment variable is missing."}\n\n`);
      return new Response(errorResponse, {
        status: 500,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    const systemPrompt = "You are an expert AI Coach for the Panaversity Course Companion. Your mission is to help students master AI Ethics, Modern Web Design, and Hybrid AI. Instruction: Be supportive, Socratic, and deep-dive into complex concepts. If a student is stuck, offer a hint instead of the full answer. Format your responses as clean Markdown.";
    
    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || [])
    ];
    
    // Add current context if provided
    const current_content = context ? `CONTEXT (Optional): ${context}\n\nUSER QUESTION: ${message}` : message;
    messages.push({ role: "user", content: current_content });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Groq: ${response.statusText}`);
    }

    // Proxy the stream and parse out the content chunks as expected by StreamingChat.tsx
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunkText = decoder.decode(value, { stream: true });
            const lines = chunkText.split("\n");
            
            for (const line of lines) {
              if (line.trim() === "" || line.trim() === "data: [DONE]") continue;
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.choices?.[0]?.delta?.content) {
                    // Send it in the format expected by StreamingChat.tsx
                    const jsonStr = JSON.stringify({ content: data.choices[0].delta.content });
                    controller.enqueue(new TextEncoder().encode(`data: ${jsonStr}\n\n`));
                  }
                } catch (e) {
                  // Ignore JSON parse errors on incomplete chunks
                }
              }
            }
          }
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat Stream API error:", error);
    const errorResponse = new TextEncoder().encode(`data: {"error": "Internal Server Error"}\n\n`);
    return new Response(errorResponse, {
      status: 500,
      headers: { "Content-Type": "text/event-stream" },
    });
  }
}
