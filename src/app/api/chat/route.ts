import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CHATBOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { 
            role: "system", 
            content: `You are the Bookin-AI Concierge. 
            MISSION: Explain how the 'Authority Stack' and our AI agents automate lead qualification and speed-to-lead.
            TONE: Professional, high-authority, and technical.
            STYLE: Use 🤖, ⚡, 🚀, and 📈 emojis.
            
            STRICT INSTRUCTIONS:
            1. DO NOT use HTML tags like <font> or <span>. 
            2. DO NOT use "lime" or any color-coding syntax.
            3. DO NOT use heart emojis (💚/❤️). Use tech-focused emojis instead.
            4. Keep responses concise (under 3 sentences).
            5. If asked about the Blueprint, tell them it's available for free download on the main page.` 
          },
          ...messages
        ],
        temperature: 0.7, // Keeps it professional but creative
      }),
    });

    const data = await response.json();

    // Error handling for the API response
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ role: 'assistant', content: '🤖 Connection is a bit laggy. Try asking again!' });
    }

    return NextResponse.json(data.choices[0].message);
    
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ role: 'assistant', content: '🤖 My circuits are crossed! Check your API key in .env.local.' }, { status: 500 });
  }
}