import { useEffect, useState } from "react";
import { TrendingUp, Users, CheckCircle, Star } from "lucide-react";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:4000";

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/patients`).then((res) => res.json()),
      fetch(`${API_URL}/rendezVous`).then((res) => res.json()),
      fetch(`${API_URL}/consultations`).then((res) => res.json()),
    ])
      .then(([pData, rData, cData]) => {
        setPatients(pData || []);
        setRendezVous(rData || []);
        setConsultations(cData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setLoading(false);
      });
  }, []);

  // 1. Chiffre d'Affaires (CA) - support 'tarif' et 'fee'
  const caTotal = consultations.reduce((sum, item) => {
    const val = item.tarif || item.fee || 0;
    return sum + Number(val);
  }, 0);

  // 2. CA du mois
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 = Janvier
  const currentYear = now.getFullYear();

  const caMois = consultations.reduce((sum, item) => {
    const val = item.tarif || item.fee || 0;
    const date = new Date(item.date || item.createdAt);
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      return sum + Number(val);
    }
    return sum;
  }, 0);

  // 3. Taux de Présence (Honoré / Total RDV)
  const totalRDV = rendezVous.length;
  const honores = rendezVous.filter((r) => r.statut === "Honoré").length;
  const tauxPresence =
    totalRDV > 0 ? ((honores / totalRDV) * 100).toFixed(1) : 0;

  // 4. Patient le plus fréquent (basé sur consultations)
  const getMostFrequent = () => {
    if (consultations.length === 0) return "N/A";
    const counts = {};
    consultations.forEach((c) => {
      const p = patients.find(
        (pat) => pat.id.toString() === c.patientId.toString()
      );
      const name = p ? `${p.prenom} ${p.nom}` : `ID: ${c.patientId}`;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  const stats = [
    {
      label: "CA du jour",
      value: `${caTotal} DH`,
      icon: <TrendingUp />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "CA du mois",
      value: `${caMois} DH`,
      icon: <TrendingUp />,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Total Des Patients",
      value: patients.length,
      icon: <Users />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Taux Présence",
      value: `${tauxPresence}%`,
      icon: <CheckCircle />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Patient Fidèle",
      value: getMostFrequent(),
      icon: <Star />,
      color: "bg-yellow-50 text-yellow-500",
    },
  ];

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cabinet Dr. Amrani</h1>
        <p className="text-gray-500">
          Statistiques et indicateurs de performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div
              className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}
            >
              {s.icon}
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase">
              {s.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}