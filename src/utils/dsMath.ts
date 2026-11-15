// Mathematical & Algorithmic Foundation for The Data Detectives
// Real Data Science computations for statistics, data cleaning, correlation, clustering & machine learning.

/**
 * Calculates the Arithmetic Mean
 * Formula: μ = (Σ x_i) / n
 */
export function calculateMean(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return Number((sum / arr.length).toFixed(2));
}

/**
 * Calculates the Median (robust central tendency)
 * Middle value of sorted observations
 */
export function calculateMedian(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
}

/**
 * Calculates the Mode (most frequently occurring observation)
 */
export function calculateMode(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;

  for (const num of arr) {
    freqMap[num] = (freqMap[num] || 0) + 1;
    if (freqMap[num] > maxFreq) {
      maxFreq = freqMap[num];
    }
  }

  if (maxFreq === 1 && arr.length > 1) {
    return []; // No distinct mode if all occur once
  }

  const modes: number[] = [];
  for (const num in freqMap) {
    if (freqMap[num] === maxFreq) {
      modes.push(Number(num));
    }
  }
  return modes.sort((a, b) => a - b);
}

/**
 * Interquartile Range (IQR) & Outlier Fence Detection
 * Lower Fence = Q1 - 1.5 * IQR
 * Upper Fence = Q3 + 1.5 * IQR
 */
export function calculateIQR(arr: number[], multiplier: number = 1.5): {
  q1: number;
  q3: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
  outliers: number[];
  inliers: number[];
} {
  if (arr.length === 0) {
    return { q1: 0, q3: 0, iqr: 0, lowerFence: 0, upperFence: 0, outliers: [], inliers: [] };
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;

  const getPercentile = (p: number) => {
    const pos = (n - 1) * p;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  };

  const q1 = Number(getPercentile(0.25).toFixed(2));
  const q3 = Number(getPercentile(0.75).toFixed(2));
  const iqr = Number((q3 - q1).toFixed(2));
  const lowerFence = Number((q1 - multiplier * iqr).toFixed(2));
  const upperFence = Number((q3 + multiplier * iqr).toFixed(2));

  const outliers: number[] = [];
  const inliers: number[] = [];

  for (const val of arr) {
    if (val < lowerFence || val > upperFence) {
      outliers.push(val);
    } else {
      inliers.push(val);
    }
  }

  return { q1, q3, iqr, lowerFence, upperFence, outliers, inliers };
}

/**
 * Pearson Product-Moment Correlation Coefficient (r)
 * r = Σ((x - x̄)(y - ȳ)) / [ √(Σ(x - x̄)²) * √(Σ(y - ȳ)²) ]
 * Ranges from -1 (perfect inverse) to +1 (perfect positive)
 */
export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n <= 1) return 0;

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return Number((numerator / denominator).toFixed(3));
}

export interface Point2D {
  id: string;
  x: number;
  y: number;
  label?: string;
}

export interface KMeansResult {
  centroids: { x: number; y: number }[];
  clusters: { [clusterIndex: number]: Point2D[] };
  iterations: number;
}

/**
 * K-Means 2D Clustering Algorithm
 * Iteratively assigns points to closest Euclidean centroid and updates centroid positions.
 */
export function runKMeans2D(points: Point2D[], k: number, maxIterations: number = 20): KMeansResult {
  if (points.length === 0 || k <= 0) {
    return { centroids: [], clusters: {}, iterations: 0 };
  }

  const kAdjusted = Math.min(k, points.length);

  // Initialize centroids using K-means++ or spread initialization
  const centroids: { x: number; y: number }[] = [];
  centroids.push({ x: points[0].x, y: points[0].y });

  for (let i = 1; i < kAdjusted; i++) {
    // pick point furthest from existing centroids
    let maxDist = -1;
    let bestPoint = points[i];
    for (const p of points) {
      let minDistToCentroid = Infinity;
      for (const c of centroids) {
        const d = Math.hypot(p.x - c.x, p.y - c.y);
        if (d < minDistToCentroid) minDistToCentroid = d;
      }
      if (minDistToCentroid > maxDist) {
        maxDist = minDistToCentroid;
        bestPoint = p;
      }
    }
    centroids.push({ x: bestPoint.x, y: bestPoint.y });
  }

  let clusters: { [clusterIndex: number]: Point2D[] } = {};
  let iterations = 0;

  for (let iter = 0; iter < maxIterations; iter++) {
    iterations++;
    clusters = {};
    for (let i = 0; i < kAdjusted; i++) clusters[i] = [];

    // Assign points to nearest centroid
    for (const p of points) {
      let nearestIdx = 0;
      let minDistance = Infinity;
      for (let cIdx = 0; cIdx < centroids.length; cIdx++) {
        const dist = Math.hypot(p.x - centroids[cIdx].x, p.y - centroids[cIdx].y);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = cIdx;
        }
      }
      clusters[nearestIdx].push(p);
    }

    // Update centroids
    let shifted = false;
    for (let cIdx = 0; cIdx < centroids.length; cIdx++) {
      const assigned = clusters[cIdx];
      if (assigned.length > 0) {
        const meanX = assigned.reduce((sum, pt) => sum + pt.x, 0) / assigned.length;
        const meanY = assigned.reduce((sum, pt) => sum + pt.y, 0) / assigned.length;
        if (Math.hypot(centroids[cIdx].x - meanX, centroids[cIdx].y - meanY) > 0.01) {
          shifted = true;
          centroids[cIdx] = { x: Number(meanX.toFixed(2)), y: Number(meanY.toFixed(2)) };
        }
      }
    }

    if (!shifted) break; // Convergence reached
  }

  return { centroids, clusters, iterations };
}

/**
 * Bias-Variance Tradeoff Simulator
 * Model complexity (1 to 10)
 * Bias^2 decreases with complexity
 * Variance increases with complexity
 * Total Error = Bias^2 + Variance + Irreducible Error
 */
export function calculateBiasVariance(complexity: number) {
  const c = Math.max(1, Math.min(10, complexity));
  // High bias at low complexity, decays exponentially
  const biasSq = Number((60 * Math.exp(-0.45 * (c - 1)) + 5).toFixed(1));
  // Low variance at low complexity, grows quadratically/exponentially
  const variance = Number((1.5 * Math.pow(c, 1.8)).toFixed(1));
  const noise = 8; // Irreducible error σ²
  const totalError = Number((biasSq + variance + noise).toFixed(1));

  // Train error drops strictly as complexity increases
  const trainError = Number((55 * Math.exp(-0.5 * (c - 1)) + 2).toFixed(1));

  return {
    complexity: c,
    biasSq,
    variance,
    noise,
    totalError,
    trainError,
    status: c <= 3 ? 'Underfitting (High Bias)' : c >= 7 ? 'Overfitting (High Variance)' : 'Optimal Generalization Balance'
  };
}

/**
 * Sampling Simulation
 * Population vs Biased vs Random Stratified Sample
 */
export function simulateSampling<T extends { category: string }>(
  population: T[],
  sampleSize: number,
  biasFactor: { targetCategory: string; weight: number }
): { sample: T[]; categoryDistribution: Record<string, number> } {
  const sample: T[] = [];
  const pool = [...population];

  while (sample.length < sampleSize && pool.length > 0) {
    const weights = pool.map(item => item.category === biasFactor.targetCategory ? biasFactor.weight : 1);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;
    let chosenIndex = 0;
    for (let i = 0; i < pool.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        chosenIndex = i;
        break;
      }
    }
    sample.push(pool.splice(chosenIndex, 1)[0]);
  }

  const categoryDistribution: Record<string, number> = {};
  for (const s of sample) {
    categoryDistribution[s.category] = (categoryDistribution[s.category] || 0) + 1;
  }

  return { sample, categoryDistribution };
}
