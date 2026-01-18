"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, AlertCircle, CheckCircle2 } from "lucide-react"

export default function ResultsPage() {
  // Load results from localStorage
  const [result, setResult] = useState({
    diagnosis: "Benign",
    riskScore: 0.15,
    confidence: 0.92,
    timestamp: new Date().toLocaleDateString(),
    analysis: {
      symmetry: "Good - Lesion appears symmetric",
      border: "Well-defined borders observed",
      color: "Uniform coloration detected",
      size: "Within normal range (< 6mm)",
      texture: "Smooth surface with consistent texture",
    },
  })

  useEffect(() => {
    // Get stored analysis results
    const storedResult = localStorage.getItem('analysisResult')
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult)
        setResult({
          diagnosis: parsedResult.diagnosis,
          riskScore: parsedResult.riskScore,
          confidence: parsedResult.confidence,
          timestamp: new Date().toLocaleDateString(),
          analysis: parsedResult.details || {
            symmetry: parsedResult.details?.symmetry || "Good - Lesion appears symmetric",
            border: parsedResult.details?.border || "Well-defined borders observed",
            color: parsedResult.details?.color || "Uniform coloration detected",
            size: parsedResult.details?.size || "Within normal range (< 6mm)",
            texture: parsedResult.details?.texture || "Smooth surface with consistent texture",
          },
        })
      } catch (error) {
        console.error('Error parsing stored results:', error)
      }
    }
  }, [])

  const isHighRisk = result.riskScore > 0.7
  const isModeratRisk = result.riskScore > 0.3 && result.riskScore <= 0.7

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-primary">Analysis Results</h1>
          <p className="text-foreground/60 mt-2">Detailed findings and recommended next steps</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Result Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Diagnosis */}
            <div className="p-6 rounded-xl bg-background border border-primary/20">
              <p className="text-foreground/60 mb-2 text-sm uppercase tracking-wider">Primary Finding</p>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  result.diagnosis === "Benign" ? "bg-green-500/10" : 
                  result.diagnosis === "Requires Further Evaluation" ? "bg-yellow-500/10" : "bg-red-500/10"
                }`}>
                  <CheckCircle2 className={`w-6 h-6 ${
                    result.diagnosis === "Benign" ? "text-green-600" : 
                    result.diagnosis === "Requires Further Evaluation" ? "text-yellow-600" : "text-red-600"
                  }`} />
                </div>
                <h2 className={`text-3xl font-bold ${
                  result.diagnosis === "Benign" ? "text-green-600" : 
                  result.diagnosis === "Requires Further Evaluation" ? "text-yellow-600" : "text-red-600"
                }`}>{result.diagnosis}</h2>
              </div>
              <p className="text-foreground/60 text-sm">Analysis Date: {result.timestamp}</p>
            </div>

            {/* Risk Score */}
            <div className="p-6 rounded-xl bg-background border border-primary/20">
              <p className="text-foreground/60 mb-2 text-sm uppercase tracking-wider">Malignancy Risk</p>
              <div className="mb-4">
                <p className="text-4xl font-bold text-primary mb-2">{(result.riskScore * 100).toFixed(1)}%</p>
                <p
                  className={`font-semibold ${
                    isHighRisk ? "text-red-600" : isModeratRisk ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {isHighRisk ? "High Risk" : isModeratRisk ? "Moderate Risk" : "Low Risk"}
                </p>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isHighRisk ? "bg-red-500" : isModeratRisk ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${result.riskScore * 100}%` }}
                />
              </div>
            </div>

            {/* Confidence */}
            <div className="p-6 rounded-xl bg-background border border-primary/20">
              <p className="text-foreground/60 mb-2 text-sm uppercase tracking-wider">Model Confidence</p>
              <div className="mb-4">
                <p className="text-4xl font-bold text-primary mb-2">{(result.confidence * 100).toFixed(1)}%</p>
                <p className="text-foreground/60 text-sm">Analysis Reliability</p>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${result.confidence * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/70">
                This analysis is for informational purposes only and should not replace professional medical advice.
                Please consult with a dermatologist for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Detailed Analysis */}
          <div className="md:col-span-2">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Analysis Details</h3>
              <div className="space-y-4">
                {Object.entries(result.analysis).map(([key, value]) => (
                  <div key={key} className="flex gap-4 p-4 rounded-lg bg-secondary/5 border border-border">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-foreground/60 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Suggested Actions */}
          <div>
            <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5">
              <h3 className="text-2xl font-bold mb-6 text-primary">Next Steps</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">📋 Schedule Checkup</p>
                  <p className="text-sm text-foreground/60">Regular skin checks recommended annually</p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">🧴 Skincare Tips</p>
                  <p className="text-sm text-foreground/60">Get personalized skincare recommendations</p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">☀️ Sun Protection</p>
                  <p className="text-sm text-foreground/60">Maintain SPF 30+ daily protection</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6 text-primary">Get Support & Guidance</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/advisor">
              <Button
                variant="outline"
                className="w-full h-auto py-6 flex flex-col items-center justify-center bg-transparent"
              >
                <span className="text-2xl mb-2">💬</span>
                <span className="font-semibold">Talk to Skincare Advisor</span>
                <span className="text-xs text-foreground/60 mt-1">Get personalized recommendations</span>
              </Button>
            </Link>
            <Link href="/dermatologist">
              <Button
                variant="outline"
                className="w-full h-auto py-6 flex flex-col items-center justify-center bg-transparent"
              >
                <span className="text-2xl mb-2">🏥</span>
                <span className="font-semibold">Find a Dermatologist</span>
                <span className="text-xs text-foreground/60 mt-1">Connect with medical professionals</span>
              </Button>
            </Link>
            <Link href="/analyze">
              <Button className="w-full h-auto py-6 flex flex-col items-center justify-center bg-primary hover:bg-primary/90">
                <span className="text-2xl mb-2">📸</span>
                <span className="font-semibold">Analyze Another Image</span>
                <span className="text-xs text-primary-foreground mt-1">Run a new analysis</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}
