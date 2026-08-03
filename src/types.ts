export interface FeedbackItem {
  id: string;
  source: 'Play Store' | 'App Store' | 'Reddit' | 'Community' | 'Survey' | string;
  content: string;
  date?: string;
  author?: string;
  rating?: number;
  category?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface ThemeCluster {
  id: string;
  title: string;
  description: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'mixed' | string;
  impactLevel: 'high' | 'medium' | 'low' | string;
  sampleQuotes: string[];
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  frequency: number;
  severity: 'critical' | 'high' | 'medium' | string;
  category: string;
  sampleQuotes: string[];
  potentialBusinessImpact: string;
  affectedUserSegments?: string[];
}

export interface Motivation {
  motivation: string;
  percentage: string;
  description: string;
  keyDrivers: string[];
}

export interface HabitPattern {
  habit: string;
  frequencyTag: string;
  description: string;
  userQuotes?: string[];
}

export interface DiscoveryPattern {
  pattern: string;
  frictionPoint: string;
  pmTakeaway: string;
}

export interface CategoryBarrier {
  category: string;
  barrier: string;
  rootCause: string;
  userFrustration: string;
}

export interface CustomerSegment {
  segmentName: string;
  description: string;
  sizePercentage: string;
  primaryNeed: string;
  keyPainPoint: string;
  recommendedFocus: string;
}

export interface ProductOpportunity {
  title: string;
  problemStatement: string;
  proposedSolution: string;
  priority: 'P0' | 'P1' | 'P2' | string;
  estimatedImpact: 'High' | 'Medium' | 'Low' | string;
  estimatedEffort: 'Small' | 'Medium' | 'Large' | string;
  affectedMetric: string;
}

export interface AIFeature {
  featureName: string;
  tagline: string;
  description: string;
  targetUserSegment: string;
  howItWorks: string;
  expectedKPIImprovement: string;
  feasibility: 'High' | 'Medium' | 'Low' | string;
}

export interface AnalysisResult {
  executiveSummary: string;
  dataMetrics: {
    totalReviewsAnalyzed: number;
    sentimentBreakdown: {
      positive: number;
      neutral: number;
      negative: number;
    };
    sourceBreakdown: {
      source: string;
      count: number;
      percentage: string;
    }[];
    overallConfidenceScore: number;
  };
  themes: ThemeCluster[];
  topPainPoints: PainPoint[];
  userMotivations: Motivation[];
  shoppingHabits: HabitPattern[];
  productDiscoveryBehaviour: DiscoveryPattern[];
  categoryExplorationBarriers: CategoryBarrier[];
  customerSegments: CustomerSegment[];
  productOpportunities: ProductOpportunity[];
  suggestedAIFeatures: AIFeature[];
  confidenceMetrics: {
    scorePercentage: number;
    reasoning: string;
    dataLimitations: string[];
  };
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lineCount: number;
  items: FeedbackItem[];
}

export interface SampleDataset {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  sources: string[];
  badge: string;
  items: FeedbackItem[];
}
