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
          content: "You are a professional assistant for Big Happy Holdings Company. Respond professionally and courteously to inquiries. Keep responses concise and business-appropriate.",
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