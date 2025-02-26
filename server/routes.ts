import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateContactResponse, initializeOpenAI } from "./services/openai";

// Define the contact form submission type
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize OpenAI if API key is present
  if (process.env.BHHC_OPENAI_KEY) {
    initializeOpenAI(process.env.BHHC_OPENAI_KEY);
  }

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Check if OpenAI is configured
      if (!process.env.BHHC_OPENAI_KEY) {
        return res.status(503).json({
          success: false,
          message: "AI response service is not configured. Please contact the administrator.",
        });
      }

      const formData = req.body as ContactFormData;

      // Generate AI response
      const aiResponse = await generateContactResponse(formData.message);

      // Return the AI-generated response
      res.json({
        success: true,
        message: "Message received",
        response: aiResponse,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your message",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}