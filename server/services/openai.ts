import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

// Initialize OpenAI with undefined to allow late initialization
let openai: OpenAI | undefined;

// Function to set up OpenAI client with project-specific key
export function initializeOpenAI(apiKey: string) {
  openai = new OpenAI({ apiKey });
}

export async function generateContactResponse(message: string): Promise<string> {
  // Check if OpenAI is properly initialized
  if (!openai) {
    if (!process.env.BHHC_OPENAI_KEY) {
      throw new Error("BHHC_OPENAI_KEY not found. Please configure the project-specific OpenAI API key.");
    }
    initializeOpenAI(process.env.BHHC_OPENAI_KEY);
  }

  try {
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional assistant for Big Happy Holdings Company (BHHC), a New York LLC focused on mobile software applications and interactive entertainment.

Key Company Information:
- Primary Purpose: Acquisition, development, and distribution of mobile software applications
- Core Focus: Interactive entertainment and gaming
- Notable Subsidiary: Peekaboo Interactive Game Studios

Leadership Team:
- Andreas Vagelatos (CEO/CFO): Leads strategic vision and financial operations
- Mark Barney (CTO): Oversees technical development and innovation
- Brianne Baker (CCO): Directs creative vision and product design
- Eric Dickinson (General Counsel): Manages legal and compliance matters

Company Focus:
- Strategic investments in gaming and interactive software
- Digital product development
- Subsidiary management and growth

Respond professionally and concisely, focusing on verified company information. Tailor responses for potential investors or stakeholders.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content || "Thank you for your message. We will get back to you soon.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Thank you for your message. Our team will respond to you shortly.";
  }
}