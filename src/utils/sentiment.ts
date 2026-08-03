export interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
}

/**
 * Normalizes sentiment counts or percentages into integer percentages
 * that ALWAYS sum up to exactly 100%.
 */
export function calculateSentimentBreakdown(sentiment?: SentimentBreakdown) {
  const posVal = Math.max(0, Number(sentiment?.positive) || 0);
  const neuVal = Math.max(0, Number(sentiment?.neutral) || 0);
  const negVal = Math.max(0, Number(sentiment?.negative) || 0);

  const total = posVal + neuVal + negVal;
  if (total === 0) {
    return { posPct: 34, neuPct: 33, negPct: 33 };
  }

  const posRatio = (posVal / total) * 100;
  const neuRatio = (neuVal / total) * 100;
  const negRatio = (negVal / total) * 100;

  let posPct = Math.floor(posRatio);
  let neuPct = Math.floor(neuRatio);
  let negPct = Math.floor(negRatio);

  let remainder = 100 - (posPct + neuPct + negPct);

  const remainders = [
    { type: 'pos', value: posRatio - posPct },
    { type: 'neu', value: neuRatio - neuPct },
    { type: 'neg', value: negRatio - negPct },
  ];

  remainders.sort((a, b) => b.value - a.value);

  for (let i = 0; i < remainder; i++) {
    if (remainders[i].type === 'pos') posPct++;
    else if (remainders[i].type === 'neu') neuPct++;
    else if (remainders[i].type === 'neg') negPct++;
  }

  return { posPct, neuPct, negPct };
}
