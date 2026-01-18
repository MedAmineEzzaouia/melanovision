export interface AnalysisResult {
  diagnosis: string
  riskScore: number
  confidence: number
  details: AnalysisDetails
}

export interface AnalysisDetails {
  symmetry: string
  border: string
  color: string
  size: string
  texture: string
  abcdScore: number
}

export function generateMockAnalysis(): AnalysisResult {
  const diagnosisOptions = ["Benign", "Requires Further Evaluation", "Suspicious"]
  const diagnosis = diagnosisOptions[Math.floor(Math.random() * diagnosisOptions.length)]

  const riskScore =
    diagnosis === "Benign"
      ? Math.random() * 0.3
      : diagnosis === "Requires Further Evaluation"
        ? 0.3 + Math.random() * 0.4
        : 0.7 + Math.random() * 0.3

  return {
    diagnosis,
    riskScore,
    confidence: 0.85 + Math.random() * 0.12,
    details: {
      symmetry: diagnosis === "Benign" ? "Symmetric lesion observed" : "Asymmetry detected",
      border: diagnosis === "Benign" ? "Well-defined borders" : "Irregular borders noted",
      color: diagnosis === "Benign" ? "Uniform color distribution" : "Multiple colors detected",
      size: diagnosis === "Benign" ? "Within normal range (<6mm)" : "Large or growing lesion",
      texture: "Surface characteristics analyzed",
      abcdScore: Math.round((riskScore * 100) / 25),
    },
  }
}

export function getRiskLevel(score: number): string {
  if (score < 0.3) return "Low Risk"
  if (score < 0.7) return "Moderate Risk"
  return "High Risk"
}

export function getSuggestions(riskScore: number): string[] {
  if (riskScore < 0.3) {
    return [
      "Continue regular skin monitoring",
      "Maintain SPF 30+ daily protection",
      "Schedule annual skin checks",
      "Practice sun safety habits",
    ]
  } else if (riskScore < 0.7) {
    return [
      "Schedule dermatology appointment soon",
      "Monitor for changes monthly",
      "Photograph for documentation",
      "Avoid sun exposure to area",
    ]
  } else {
    return [
      "Urgent dermatology consultation recommended",
      "Prepare documentation of changes",
      "Avoid touching or scratching",
      "Keep area protected from sun",
    ]
  }
}
