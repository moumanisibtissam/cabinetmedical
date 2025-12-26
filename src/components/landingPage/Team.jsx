import { User } from "lucide-react";

export function Team() {
  return (
    <section className="py-24 bg-background w-full" id="equipe">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">L'Équipe du Projet</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-16">
          Les développeurs passionnés derrière la transformation numérique du cabinet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Team Member 1 */}
          <div className="bg-background rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-24 h-24 mx-auto bg-[#006d77]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <User className="w-10 h-10 text-[#006d77]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ibtissam Moumanis</h3>
            <p className="text-[#006d77] font-medium mb-4">Project Developer</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-background rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-24 h-24 mx-auto bg-[#006d77]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <User className="w-10 h-10 text-[#006d77]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Rayhana Sabbar</h3>
            <p className="text-[#006d77] font-medium mb-4">Project Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;