"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, Loader2, MapPin, Phone, Clock } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface DermatologistResult {
  name: string
  specialty: string
  address: string
  phone: string
  city: string
}

export default function DermatologistPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "👋 Hi! I can help you find dermatologists in Tunis. Tell me your concern or specialty (e.g., mélanome, cancer, chirurgie, pédiatrique, esthétique).",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<DermatologistResult[] | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])

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
      const res = await fetch("http://127.0.0.1:8000/api/dermo/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      })

      const data = await res.json()

      // Bot message text
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.message || data.response || "Here are some suggestions",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      if (data.type === "results") {
        setResults(data.dermatologists)
      } else {
        setResults(null)
      }

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "⚠️ Error connecting to dermatologist service.",
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
        <div className="max-w-6xl mx-auto px-4 py-5 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all font-medium hover:scale-105 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Find a Dermatologist in Tunis
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Connect with certified skin specialists</p>
        </div>
      </nav>

      <div className="relative flex-1 grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Chat column */}
        <Card className="p-6 flex flex-col bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl rounded-2xl">"
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-3 rounded-lg max-w-xs ${
                    msg.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-secondary/30 text-foreground rounded-bl-none border border-primary/10"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-3 border-t pt-4 mt-4">
            <input
              value={input}
              type="text"
              disabled={isLoading}
              placeholder="Ex: mélanome, chirurgie, enfant..."
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Results column */}
        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-4">
              {results.map((doc, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold text-primary">{doc.name}</h3>
                  <p className="text-sm">{doc.specialty}</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p><MapPin className="inline w-4 h-4 mr-2"/> {doc.address}</p>
                    <p><Phone className="inline w-4 h-4 mr-2"/> {doc.phone}</p>
                  </div>
                  <Button className="w-full mt-4 bg-primary text-white">Call Clinic</Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center opacity-60">
              <MapPin className="w-12 h-12 mx-auto mb-4"/>
              Enter a specialty or concern to find a dermatologist
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
