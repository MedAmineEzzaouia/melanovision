"use client"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-3">About MelanoVision</h4>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Early melanoma detection saves lives. Our AI-powered platform combines deep learning with expert support
              to help you take control of your skin health.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/analyze" className="text-foreground/60 hover:text-foreground transition">
                  Analyze Images
                </a>
              </li>
              <li>
                <a href="/advisor" className="text-foreground/60 hover:text-foreground transition">
                  Skincare Advisor
                </a>
              </li>
              <li>
                <a href="/dermatologist" className="text-foreground/60 hover:text-foreground transition">
                  Find Dermatologist
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Important</h4>
            <p className="text-foreground/60 text-sm leading-relaxed">
              This platform provides educational information only. Always consult with a dermatologist for professional
              medical diagnosis and treatment.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>© 2025 MelanoVision. All rights reserved. Early detection saves lives.</p>
        </div>
      </div>
    </footer>
  )
}
