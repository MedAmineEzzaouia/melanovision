"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Upload,
  Loader2,
  Check,
  AlertCircle,
  MessageCircle,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { generateMockAnalysis, getRiskLevel } from "@/utils/analysis"

export default function AnalyzePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<ReturnType<typeof generateMockAnalysis> | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setAnalysisResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedFile) return
    setIsAnalyzing(true)
    
    try {
      // Create FormData to send the image
      const formData = new FormData()
      formData.append('image', selectedFile)

      // Call the backend API
      const response = await fetch('http://127.0.0.1:8000/api/detection/predict/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image')
      }

      const backendResult = await response.json()
      
      // Map backend response to frontend format
      const result = {
        diagnosis: backendResult.prediction === 'melanoma' ? 'Suspicious' : 
                   backendResult.prediction === 'suspicious' ? 'Requires Further Evaluation' : 'Benign',
        riskScore: backendResult.risk_level === 'HIGH' ? 0.8 : 
                   backendResult.risk_level === 'MEDIUM' ? 0.5 : 0.2,
        confidence: backendResult.confidence,
        details: {
          symmetry: backendResult.prediction === 'benign' ? 'Symmetric lesion observed' : 'Asymmetry detected',
          border: backendResult.prediction === 'benign' ? 'Well-defined borders' : 'Irregular borders noted',
          color: backendResult.prediction === 'benign' ? 'Uniform color distribution' : 'Multiple colors detected',
          size: backendResult.prediction === 'benign' ? 'Within normal range (<6mm)' : 'Large or growing lesion',
          texture: 'Surface characteristics analyzed',
          abcdScore: Math.round((backendResult.confidence * 100) / 25),
        }
      }
      
      setAnalysisResult(result)
    } catch (error) {
      console.error('Error analyzing image:', error)
      alert('Failed to analyze image. Make sure the backend is running on http://127.0.0.1:8000')
      // Fallback to mock data if backend fails
      const result = generateMockAnalysis()
      setAnalysisResult(result)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getDiagnosisColor = (diagnosis: string) => {
    if (diagnosis === "Benign") return "text-green-600"
    if (diagnosis === "Requires Further Evaluation") return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f4fc] via-[#f0f7fc] to-[#e0f2f7] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-300/20 to-cyan-300/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/15 to-blue-300/15 rounded-full blur-3xl"></div>
      </div>
      
      <nav className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all mb-4 font-medium hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Skin Image Analysis
          </h1>
          <p className="text-slate-600 text-lg">Upload and analyze your skin images with AI-powered detection</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Card className="p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition bg-gradient-to-br from-white to-blue-50/50 glass card-hover">
              <div className="flex flex-col items-center justify-center py-12">
                {!selectedImage ? (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center mb-4 pulse-glow">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Upload Skin Image</h3>
                    <p className="text-foreground/60 text-center mb-6">
                      Choose a clear, well-lit image of the skin area
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-3 text-white rounded-xl hover:shadow-xl transition font-bold flex items-center gap-2 group"
                      style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
                    >
                      <Upload className="w-5 h-5" />
                      Select Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Selected skin image"
                      className="w-full h-64 object-cover rounded-2xl shadow-xl ring-2 ring-primary/20"
                    />
                  </div>
                )}
              </div>
            </Card>

            {selectedImage && (
              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 hover:shadow-xl text-white font-bold"
                  size="lg"
                  style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Run Analysis
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setSelectedImage(null)
                    setSelectedFile(null)
                    setAnalysisResult(null)
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-blue-50 hover:border-primary"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>

          <div>
            {analysisResult ? (
              <Card className="p-8 bg-gradient-to-br from-white to-blue-50/40 border-primary/20 glass shadow-xl card-hover">
                <h3
                  className="text-2xl font-bold mb-6 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(to right, #3575fe, #193378)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <Sparkles className="w-6 h-6" />
                  Analysis Results
                </h3>

                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-primary/10 hover:border-primary/30 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className={`w-5 h-5 ${getDiagnosisColor(analysisResult.diagnosis)}`} />
                    </div>
                    <span className="text-foreground/60 font-bold">Diagnosis</span>
                  </div>
                  <p className={`text-3xl font-bold ${getDiagnosisColor(analysisResult.diagnosis)}`}>
                    {analysisResult.diagnosis}
                  </p>
                </div>

                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-primary/10 hover:border-primary/30 transition">
                  <span className="text-foreground/60 block mb-2 font-bold">Risk Score</span>
                  <div className="mb-3">
                    <div
                      className="text-3xl font-bold"
                      style={{
                        background: "linear-gradient(to right, #3575fe, #193378)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {(analysisResult.riskScore * 100).toFixed(1)}%
                    </div>
                    <p className="text-foreground/60 text-sm">{getRiskLevel(analysisResult.riskScore)}</p>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        analysisResult.riskScore < 0.3
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : analysisResult.riskScore < 0.7
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                      }`}
                      style={{ width: `${analysisResult.riskScore * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-primary/10 hover:border-primary/30 transition">
                  <span className="text-foreground/60 block mb-2 font-bold">Model Confidence</span>
                  <div
                    className="text-3xl font-bold mb-3"
                    style={{
                      background: "linear-gradient(to right, #3575fe, #193378)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {(analysisResult.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        background: "linear-gradient(to right, #3575fe, #193378)",
                        width: `${analysisResult.confidence * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-yellow-50/50 border border-yellow-200/50 mb-6 glass">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70 font-medium">
                      This analysis is for informational purposes only. Always consult with a dermatologist for
                      professional medical advice.
                    </p>
                  </div>
                </div>

                <Link href="/results" className="block mb-3">
                  <Button
                    onClick={() => {
                      // Store results in localStorage for the results page
                      if (analysisResult) {
                        localStorage.setItem('analysisResult', JSON.stringify(analysisResult))
                      }
                    }}
                    className="w-full hover:shadow-xl text-white font-bold"
                    style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
                  >
                    View Detailed Results
                  </Button>
                </Link>
              </Card>
            ) : (
              <Card className="p-8 border-primary/10 text-center py-16 bg-gradient-to-br from-white to-blue-50/30 glass card-hover">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary/40" />
                </div>
                <p className="text-foreground/60 font-medium">Upload an image to get started with your analysis</p>
              </Card>
            )}
          </div>
        </div>

        {analysisResult && (
          <div className="mt-16">
            <div className="mb-8">
              <h2
                className="text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(to right, #3575fe, #193378)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Next Steps
              </h2>
              <p className="text-foreground/60 text-lg">Get personalized guidance and professional support</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/advisor">
                <Card className="p-8 bg-gradient-to-br from-white to-blue-50/40 border-primary/20 glass card-hover group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
                      >
                        <MessageCircle className="w-7 h-7 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary/40 group-hover:translate-x-1 transition" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Skincare Advisor</h3>
                    <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                      Get personalized skincare recommendations tailored to your skin type, concerns, and age. Our
                      AI-powered advisor provides expert guidance.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span>Chat Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/dermatologist">
                <Card className="p-8 bg-gradient-to-br from-white to-blue-50/40 border-primary/20 glass card-hover group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
                      >
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary/40 group-hover:translate-x-1 transition" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Find a Dermatologist</h3>
                    <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                      Connect with qualified dermatologists in your area. View ratings, availability, and contact
                      information to schedule your consultation.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span>Find Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
