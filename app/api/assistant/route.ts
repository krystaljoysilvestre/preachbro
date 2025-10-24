import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// 🎯 Friendly mode prompts
const MODE_PROMPTS: Record<string, string> = {
  outline: `
You are helping a pastor craft a sermon outline.
Always respond with **two clearly separated sections**:
1. A brief, friendly introduction (1–2 sentences)  
→ Example: "That’s a beautiful passage, Pastor. Here’s a way you might structure your message around it."

Note: add text separation between the two sections like "-----".

2. A Markdown-formatted sermon outline, following this structure exactly:
## Title: (short, engaging sermon title)

**Key Verse:**  
(reference and verse)

**Outline:**  
1. (main point one with a short, clear explanation)  
2. (main point two with a short, clear explanation)  
3. (main point three with a short, clear explanation)  

**Application:**  
(a few sentences encouraging personal reflection and action)

Tone: warm, encouraging, and pastoral — not academic.
Keep language natural and faith-centered.
Avoid prefacing text with "Here's your outline" or any intro lines.
If user follows up, refine or expand the previous outline contextually. Feel free to add more outlines or applications as needed.
`,

  general: `
You are "My Sermon Assistant" — a friendly pastoral companion.
You help pastors write, refine, and pray through messages.
Speak warmly, naturally, and with spiritual encouragement.
Include Scripture references only if relevant.
Respond conversationally, not mechanically.
If context from earlier messages exists, remember it.
`,
};

export async function POST(req: Request) {
  try {
    const { message, history = [], mode } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // Determine mode automatically unless explicitly set
    const selectedMode =
      mode ||
      (message.toLowerCase().includes("outline") ||
      history.some((h: any) =>
        (h.content || "").toLowerCase().includes("**outline:**")
      )
        ? "outline"
        : "general");

    const systemPrompt = `
${MODE_PROMPTS[selectedMode]}

If the user asks for a sermon outline, respond using Markdown with the specified structure.
If the user follows up, continue the same style and tone.
`.trim();

    // Build messages for the conversation
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 900,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while connecting to OpenAI." },
      { status: 500 }
    );
  }
}
