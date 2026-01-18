import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Brain, MessageCircle, MapPin, ArrowRight, Shield, Stethoscope, Scan, Clock, CheckCircle2, Sparkles, Bot, Activity } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f4fc] via-[#f0f7fc] to-[#e0f2f7] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flowing tech lines - left side */}
        <svg className="absolute left-0 top-0 h-full w-1/3 opacity-30" viewBox="0 0 300 800" fill="none">
          <path d="M-100 100 Q 50 200 0 400 T 50 700" stroke="url(#techGrad)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M-80 150 Q 70 250 20 450 T 70 750" stroke="url(#techGrad)" strokeWidth="1" fill="none" />
          <path d="M-60 50 Q 90 150 40 350 T 90 650" stroke="url(#techGrad)" strokeWidth="1.5" fill="none" />
          <path d="M-40 200 Q 110 300 60 500 T 110 800" stroke="url(#techGrad)" strokeWidth="1" fill="none" />
          <path d="M-20 80 Q 130 180 80 380 T 130 680" stroke="url(#techGrad)" strokeWidth="0.5" fill="none" className="animate-pulse" />
          {/* Dots on lines */}
          <circle cx="20" cy="300" r="4" fill="#3b82f6" className="animate-ping" style={{animationDuration: '3s'}} />
          <circle cx="50" cy="500" r="3" fill="#06b6d4" className="animate-ping" style={{animationDuration: '4s'}} />
          <circle cx="0" cy="200" r="3" fill="#3b82f6" className="animate-ping" style={{animationDuration: '2.5s'}} />
          <defs>
            <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Large gradient orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-300/30 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              MelanoVision
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/analyze" className="text-slate-600 hover:text-blue-600 transition-all font-medium hover:scale-105">
              Analyze
            </Link>
            <Link href="/dermatologist" className="text-slate-600 hover:text-blue-600 transition-all font-medium hover:scale-105">
              Find Specialist
            </Link>
            <Link href="/advisor" className="text-slate-600 hover:text-blue-600 transition-all font-medium hover:scale-105">
              AI Advisor
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative">
            {/* Decorative element */}
            <div className="absolute -left-20 top-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-2xl"></div>
            
            <div className="space-y-2 relative">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight tracking-tight">
                Early Detection
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
                Saves Lives
              </h1>
            </div>
            
            <div className="space-y-3 max-w-lg">
              <p className="text-slate-600 text-xl leading-relaxed">
                AI-powered platform for melanoma detection.
              </p>
              <p className="text-slate-500 text-lg">
                Upload a skin image, get instant and accurate analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/analyze">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/30 rounded-full px-8 py-6 text-base font-semibold group transition-all hover:scale-105 hover:shadow-2xl">
                  <Scan className="w-5 h-5 mr-2" />
                  Start Analysis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dermatologist">
                <Button size="lg" variant="outline" className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-400 rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-105 hover:shadow-lg">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-slate-700">Find Specialist</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Enhanced Platform Mockup */}
          <div className="hidden lg:block relative">
            {/* Floating Robot Assistant - Top Right */}
            <div className="absolute -top-8 -right-4 z-20 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl p-3 shadow-xl">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <Bot className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl px-4 py-2 shadow-lg border border-slate-200 whitespace-nowrap">
                <p className="text-xs text-slate-600">Remember to use sunscreen daily!</p>
              </div>
            </div>

            {/* Main Platform Display */}
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl scale-105"></div>
              
              {/* Platform Container */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-2xl border border-white/50">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero-skin-analysis.jpg"
                    alt="AI Skin Analysis Platform"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Card - MELANOMA Detection */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-10 animate-pulse" style={{animationDuration: '4s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Analysis Complete</div>
                    <div className="text-lg font-bold text-slate-800">92.1% <span className="text-green-500">BENIGN</span></div>
                  </div>
                </div>
              </div>

              {/* Floating Card - Right Side */}
              <div className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-400 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">AI Assistant</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I've found 3 dermatologists near you with available appointments.
                </p>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -bottom-16 right-20 w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Trusted Medical AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Clinical-grade AI analysis in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Image",
                description: "Securely upload a clear photo of the skin area you want to analyze",
                step: "01"
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description: "Advanced deep learning algorithms analyze patterns and characteristics",
                step: "02"
              },
              {
                icon: Stethoscope,
                title: "Expert Results",
                description: "Get detailed insights and connect with certified dermatologists",
                step: "03"
              },
            ].map((item, i) => (
              <Card key={i} className="relative p-8 bg-gradient-to-br from-white to-blue-50/30 border-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-3xl group hover:-translate-y-2">
                {/* Step number */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-blue-100 group-hover:text-blue-200 transition-colors">{item.step}</div>
                
                <div className="relative space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2rem] bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-blue-500/30">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-3xl"></div>
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
            </div>
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white">Take the First Step</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Early detection is crucial. Start your skin analysis now or connect with a specialist.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <Link href="/analyze">
                  <Button size="lg" className="bg-white hover:bg-slate-50 text-blue-600 font-bold shadow-xl rounded-full px-10 py-6 text-lg transition-all hover:scale-105 hover:shadow-2xl">
                    <Scan className="w-6 h-6 mr-2" />
                    Start Free Analysis
                  </Button>
                </Link>
                <Link href="/dermatologist">
                  <Button size="lg" variant="outline" className="border-2 border-white/40 hover:bg-white/20 text-white bg-transparent rounded-full px-10 py-6 text-lg font-semibold transition-all hover:scale-105">
                    <MapPin className="w-6 h-6 mr-2" />
                    Find Dermatologist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              MelanoVision
            </span>
          </div>
          <p className="text-sm text-slate-600">
            © 2025 MelanoVision. Early detection saves lives. Always consult with a dermatologist for professional advice.
          </p>
        </div>
      </footer>
    </main>
  )
}
