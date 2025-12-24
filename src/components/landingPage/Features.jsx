import {
  Users,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestion des patients",
    description:
      "Création et gestion complète des dossiers patients avec informations personnelles, groupe sanguin, allergies, âge calculé automatiquement et numéro de dossier généré.",
  },
  {
    icon: Calendar,
    title: "Gestion des rendez-vous",
    description:
      "Planification, modification et annulation des rendez-vous avec validation automatique des conflits horaires et suivi des statuts.",
  },
  {
    icon: FileText,
    title: "Consultations médicales",
    description:
      "Enregistrement des consultations incluant diagnostic, ordonnance, tarif et mode de paiement, avec historique médical lié à chaque patient.",
  },
  {
    icon: BarChart3,
    title: "Statistiques & rapports",
    description:
      "Suivi des indicateurs clés : chiffre d’affaires journalier et mensuel, taux de présence, nombre de patients et patient le plus fréquent.",
  },
]

export default function Features() {
  return (
    <section id="fonctionnalites" className=" bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Une gestion complète du cabinet médical
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une solution digitale moderne pour organiser les patients,
            les rendez-vous et les consultations efficacement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
