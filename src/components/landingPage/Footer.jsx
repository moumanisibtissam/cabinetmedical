export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CA</span>
            </div>
            <span className="font-semibold text-foreground">Cabinet Dr. Amrani</span>
          </div>

          <div className="flex gap-8 text-sm">
            <a href="#a-propos" className="text-muted-foreground hover:text-foreground transition">
				À propos
            </a>
            <a href="#equipe" className="text-muted-foreground hover:text-foreground transition">
              	Équipe
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition">
				Contact
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 Cabinet Dr. Amrani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
