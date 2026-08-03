import type { VercelRequest, VercelResponse } from "@vercel/node";
import { analyzeReviewsWithGemini } from "./lib/geminiAnalyzer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { reviews, datasetName } = req.body || {};

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({ error: "No reviews provided for analysis." });
    }

    const result = await analyzeReviewsWithGemini(reviews, datasetName);
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error("Error analyzing reviews with Gemini:", error);
    return res.status(500).json({
      error: error?.message || "Failed to analyze reviews using Gemini AI.",
    });
  }
}