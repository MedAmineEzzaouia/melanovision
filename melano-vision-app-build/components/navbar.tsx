"use client"

import Link from "next/link"
import { Brain, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full border-b border-border bg-card/95 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-primary hidden sm:inline">MelanoVision</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/analyze" className="text-foreground/70 hover:text-foreground transition font-medium">
            Analyze
          </Link>
          <Link href="/dermatologist" className="text-foreground/70 hover:text-foreground transition font-medium">
            Dermatologist
          </Link>
          <Link href="/advisor" className="text-foreground/70 hover:text-foreground transition font-medium">
            Advisor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-secondary/20 rounded-lg transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/analyze"
              className="block px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition"
            >
              Analyze
            </Link>
            <Link
              href="/dermatologist"
              className="block px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition"
            >
              Find Dermatologist
            </Link>
            <Link
              href="/advisor"
              className="block px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition"
            >
              Skincare Advisor
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
