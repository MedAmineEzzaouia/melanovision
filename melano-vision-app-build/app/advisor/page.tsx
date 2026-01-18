"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, Loader2, Sparkles, MessageCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "advisor"
  content: string
  timestamp: Date
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "advisor",
      content:
        "Hello! I am your Skincare Advisor. Tell me your skin type, your main concern, or ask about routines, products, sun protection, and prevention.",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("http://127.0.0.1:8000/api/skincare/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      })

      const data = await res.json()

      const advisorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "advisor",
        content: data.answer || "Sorry, I couldn't process your request.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, advisorMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "advisor",
          content: "⚠️ Error connecting to the skincare assistant.",
          timestamp: new Date(),
        },
      ])
    }

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e8f4fc] via-[#f0f7fc] to-[#e0f2f7] relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-300/20 to-cyan-300/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/15 to-blue-300/15 rounded-full blur-3xl"></div>
      </div>
      
      <nav className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1
            className="text-4xl font-bold flex items-center gap-2"
            style={{
              background: "linear-gradient(to right, #3575fe, #193378)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <MessageCircle className="w-8 h-8" style={{ color: "#3575fe" }} />
            Skincare Advisor
          </h1>
          <p className="text-foreground/60 mt-2">
            Get personalized skincare recommendations
          </p>
        </div>
      </nav>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Card className="flex-1 p-6 mb-6 flex flex-col bg-gradient-to-br from-white to-blue-50/30 border-primary/20 glass shadow-xl">
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl transition-all ${
                    message.type === "user"
                      ? "text-white rounded-br-none shadow-lg"
                      : "bg-gradient-to-br from-white to-blue-50/50 text-foreground border border-primary/20 rounded-bl-none glass"
                  }`}
                  style={
                    message.type === "user" ? { background: "linear-gradient(to right, #3575fe, #193378)" } : undefined
                  }
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.type === "user" ? "text-white/70" : "text-foreground/60"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-white to-blue-50/50 text-foreground border border-primary/20 rounded-2xl rounded-bl-none px-4 py-3 glass">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-3 pt-4 border-t border-primary/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about skincare, routines, sun protection..."
              className="flex-1 bg-white border border-primary/20 rounded-xl px-4 py-2 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="hover:shadow-lg text-white font-bold"
              style={{ background: "linear-gradient(to right, #3575fe, #193378)" }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-white border-primary/20 glass">
          <p className="text-sm text-foreground/60 mb-3 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Quick topics:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "Acne Care",
              "Dry Skin",
              "Oily Skin",
              "Anti-aging",
              "Sun Protection",
              "Sensitive Skin",
              "Routine Tips",
              "Product Recs",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setInput(`Tell me about ${topic.toLowerCase()}`)}
                className="text-xs px-3 py-2 rounded-lg bg-white border border-primary/20 hover:border-primary hover:bg-blue-50 hover:shadow-md transition text-foreground/70 hover:text-foreground font-medium"
              >
                {topic}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
