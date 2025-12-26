import { MoveRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import Button from "../ui/Button";

export function Hero() {
  return (
    <section id="a-propos" className="relative w-full py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 z-10 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006d77]/10 text-[#006d77] text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006d77] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006d77]"></span>
              </span>
              Projet 
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-slide-up duration-700">
              Modernisation du <br />
              <span className="text-[#006d77]">Cabinet Dr. Amrani</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed max-w-lg animate-slide-up duration-1000 delay-100">
              Nous transformons la gestion traditionnelle papier en une solution numérique performante pour plus d'efficacité et de sérénité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up duration-1000 delay-200">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-[#006d77] text-white hover:bg-[#005f66]">
                  Accéder à l'application
                  <MoveRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                En savoir plus
              </Button>
            </div>

            {/* Key Benefits List */}
            <div className="pt-8 space-y-3 animate-fade-in delay-300">
              {[
                "Gestion simplifiée des rendez-vous",
                "Gain de temps administratif",
                "Fiabilité et sécurité des données"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-500">
                  <CheckCircle2 className="w-5 h-5 text-[#006d77]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Frame */}
            <div className="relative w-full max-w-md h-[500px] rounded-[2.5rem] border-2 border-[#006d77] bg-white" />

            {/* Image overlapping the frame */}
            <img
              src="/doctor.png"
              alt="Doctor"
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[580px] object-contain z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;