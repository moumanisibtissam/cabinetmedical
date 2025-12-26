export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006d77] flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <span className="font-semibold text-[#006d77]">Cabinet Dr. Amrani</span>
          </div>

          <div className="flex gap-8 text-sm">
            <a
              href="#a-propos"
              className="text-gray-500 hover:text-[#006d77] transition"
            >
              À propos
            </a>
            <a
              href="#equipe"
              className="text-gray-500 hover:text-[#006d77] transition"
            >
              Équipe
            </a>
            <a
              href="#contact"
              className="text-gray-500 hover:text-[#006d77] transition"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Cabinet Dr. Amrani.
          </p>
        </div>
      </div>
    </footer>
  );
}