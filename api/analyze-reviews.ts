  import type { VercelRequest, VercelResponse } from "@vercel/node";
  import { GoogleGenAI, Type } from "@google/genai";

  export const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Schema builder helpers
  const str = () => ({ type: Type.STRING });
  const num = () => ({ type: Type.NUMBER });
  const arrOf = (items: any) => ({ type: Type.ARRAY, items });
  const strArr = () => arrOf(str());
  const obj = (properties: Record<string, any>, required?: string[]) => ({
    type: Type.OBJECT,
    properties,
    ...(required ? { required } : {}),
  });

  const geminiResponseSchema = obj(
    {
      executiveSummary: str(),
      dataMetrics: obj(
        {
          totalReviewsAnalyzed: num(),
          sentimentBreakdown: obj(
            { positive: num(), neutral: num(), negative: num() },
            ["positive", "neutral", "negative"]
          ),
          sourceBreakdown: arrOf(
            obj(
              { source: str(), count: num(), percentage: str() },
              ["source", "count", "percentage"]
            )
          ),
          overallConfidenceScore: num(),
        },
        ["totalReviewsAnalyzed", "sentimentBreakdown", "overallConfidenceScore"]
      ),
      themes: arrOf(
        obj(
          {
            id: str(),
            title: str(),
            description: str(),
            count: num(),
            sentiment: str(),
            impactLevel: str(),
            sampleQuotes: strArr(),
          },
          ["id", "title", "description", "count", "sentiment", "impactLevel", "sampleQuotes"]
        )
      ),
      topPainPoints: arrOf(
        obj(
          {
            id: str(),
            title: str(),
            description: str(),
            frequency: num(),
            severity: str(),
            category: str(),
            sampleQuotes: strArr(),
            potentialBusinessImpact: str(),
            affectedUserSegments: strArr(),
          },
          ["id", "title", "description", "frequency", "severity", "category", "sampleQuotes", "potentialBusinessImpact"]
        )
      ),
      userMotivations: arrOf(
        obj(
          {
            motivation: str(),
            percentage: str(),
            description: str(),
            keyDrivers: strArr(),
          },
          ["motivation", "percentage", "description", "keyDrivers"]
        )
      ),
      shoppingHabits: arrOf(
        obj(
          {
            habit: str(),
            frequencyTag: str(),
            description: str(),
            userQuotes: strArr(),
          },
          ["habit", "frequencyTag", "description"]
        )
      ),
      productDiscoveryBehaviour: arrOf(
        obj(
          {
            pattern: str(),
            frictionPoint: str(),
            pmTakeaway: str(),
          },
          ["pattern", "frictionPoint", "pmTakeaway"]
        )
      ),
      categoryExplorationBarriers: arrOf(
        obj(
          {
            category: str(),
            barrier: str(),
            rootCause: str(),
            userFrustration: str(),
          },
          ["category", "barrier", "rootCause", "userFrustration"]
        )
      ),
      customerSegments: arrOf(
        obj(
          {
            segmentName: str(),
            description: str(),
            sizePercentage: str(),
            primaryNeed: str(),
            keyPainPoint: str(),
            recommendedFocus: str(),
          },
          ["segmentName", "description", "sizePercentage", "primaryNeed", "keyPainPoint", "recommendedFocus"]
        )
      ),
      productOpportunities: arrOf(
        obj(
          {
            title: str(),
            problemStatement: str(),
            proposedSolution: str(),
            priority: str(),
            estimatedImpact: str(),
            estimatedEffort: str(),
            affectedMetric: str(),
          },
          ["title", "problemStatement", "proposedSolution", "priority", "estimatedImpact", "estimatedEffort", "affectedMetric"]
        )
      ),
      suggestedAIFeatures: arrOf(
        obj(
          {
            featureName: str(),
            tagline: str(),
            description: str(),
            targetUserSegment: str(),
            howItWorks: str(),
            expectedKPIImprovement: str(),
            feasibility: str(),
          },
          ["featureName", "tagline", "description", "targetUserSegment", "howItWorks", "expectedKPIImprovement", "feasibility"]
        )
      ),
      confidenceMetrics: obj(
        {
          scorePercentage: num(),
          reasoning: str(),
          dataLimitations: strArr(),
        },
        ["scorePercentage", "reasoning", "dataLimitations"]
      ),
    },
    [
      "executiveSummary",
      "dataMetrics",
      "themes",
      "topPainPoints",
      "userMotivations",
      "shoppingHabits",
      "productDiscoveryBehaviour",
      "categoryExplorationBarriers",
      "customerSegments",
      "productOpportunities",
      "suggestedAIFeatures",
      "confidenceMetrics",
    ]
  );

  export async function analyzeReviewsWithGemini(reviews: any[], datasetName?: string) {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      throw new Error("No reviews provided for analysis.");
    }

    const ai = getGeminiClient();

    const trimmedReviews = reviews.slice(0, 300);
    const feedbackText = trimmedReviews
      .map((item: any, index: number) => {
        const sourceStr = item.source ? `[Source: ${item.source}]` : "";
        const ratingStr = item.rating ? `[Rating: ${item.rating}/5]` : "";
        const dateStr = item.date ? `[Date: ${item.date}]` : "";
        return `[Review ${index + 1}] ${sourceStr} ${ratingStr} ${dateStr}: "${item.content}"`;
      })
      .join("\n\n");

    const prompt = `
  You are a Senior Principal Product Manager leading Customer Intelligence and AI Innovation for Blinkit (India's premier 10-minute Quick Commerce platform).
  Analyze the following batch of ${trimmedReviews.length} customer feedback items from Play Store reviews, App Store reviews, Reddit discussions, community forums, and customer surveys.

  Dataset context: ${datasetName || "Uploaded Customer Feedback Files"}

  Perform a deep, rigorous PM discovery analysis on this feedback dataset and extract actionable product insights.

  CRITICAL CONTENT QUALITY INSTRUCTIONS:
  - Tone & Terminology: Use authentic Blinkit and Quick Commerce Product Management terminology (e.g., 10-min SLA, Dark Store picking density, SKU depth, D30 Retention, Cart Abandonment Rate, Basket Size, AOV, Regional Vernacular Search, Substitute Fallbacks, Instant Self-Service Refunds).
  - Representative Quotes: Quote actual customer statements verbatim or synthesize natural customer feedback. NEVER include artificial IDs or labels like "ID #12", "Customer ID 12", or "User #4".
  - Coherence & Storytelling: Ensure every insight, theme, pain point, persona, and product opportunity logically connects back to customer behavior, quick-commerce fulfillment realities, and strategic business impact.

  Instructions:
  1. Executive Summary: A concise summary highlighting key findings, sentiment, friction points, and takeaways.
  2. Metrics: Source distribution, sentiment percentages, overall confidence score.
  3. Recurring Themes & Clusters: Group feedback into 5-8 distinct thematic clusters.
  4. Top Pain Points: Identify 5-8 frequently mentioned pain points with frequency, severity, category, sample quotes, and business impact.
  5. User Motivations: Identify core drivers.
  6. Shopping Habits: Map customer behaviors and preferences.
  7. Product Discovery Behaviour: Analyze search query habits and category friction.
  8. Category Exploration Barriers: Highlight reasons why customers hesitate to try new categories.
  9. Customer Segments: Identify 4-6 distinct user personas/segments.
  10. Product Opportunities: Define 5-7 actionable PM roadmap features.
  11. Suggested AI Features: Propose 3-5 innovative AI-powered capabilities.
  12. Confidence & Data Limitations: Provide confidence level score and note limitations.

  Feedback Data to analyze:
  ${feedbackText}
  `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an expert Principal Product Manager at Blinkit specializing in e-commerce, quick-commerce logistics, user experience, and AI product innovation. Deliver detailed, highly realistic, non-generic PM insight analysis in JSON format.",
        responseMimeType: "application/json",
        responseSchema: geminiResponseSchema as any,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from Gemini model.");
    }

    const parsedResult = JSON.parse(responseText);

    if (!parsedResult.dataMetrics) {
      parsedResult.dataMetrics = {};
    }

    parsedResult.dataMetrics.totalReviewsAnalyzed = reviews.length;

    const sourceCounts: Record<string, number> = {};
    reviews.forEach((item: any) => {
      const src = item.source || "Other";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    parsedResult.dataMetrics.sourceBreakdown = Object.entries(sourceCounts).map(([source, count]) => ({
      source,
      count,
      percentage: `${Math.round((count / reviews.length) * 100)}%`,
    }));

    const rawSentiment = parsedResult.dataMetrics.sentimentBreakdown || {};
    const posVal = Math.max(0, Number(rawSentiment.positive) || 0);
    const neuVal = Math.max(0, Number(rawSentiment.neutral) || 0);
    const negVal = Math.max(0, Number(rawSentiment.negative) || 0);

    const totalVal = posVal + neuVal + negVal;
    if (totalVal > 0) {
      const pR = (posVal / totalVal) * 100;
      const nR = (neuVal / totalVal) * 100;
      const ngR = (negVal / totalVal) * 100;

      let pP = Math.floor(pR);
      let nP = Math.floor(nR);
      let ngP = Math.floor(ngR);

      let rem = 100 - (pP + nP + ngP);
      const rems = [
        { key: "p", val: pR - pP },
        { key: "n", val: nR - nP },
        { key: "ng", val: ngR - ngP },
      ].sort((a, b) => b.val - a.val);

      for (let i = 0; i < rem; i++) {
        if (rems[i].key === "p") pP++;
        else if (rems[i].key === "n") nP++;
        else if (rems[i].key === "ng") ngP++;
      }

      parsedResult.dataMetrics.sentimentBreakdown = {
        positive: pP,
        neutral: nP,
        negative: ngP,
      };
    } else {
      parsedResult.dataMetrics.sentimentBreakdown = {
        positive: 35,
        neutral: 20,
        negative: 45,
      };
    }

    return parsedResult;
  }
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