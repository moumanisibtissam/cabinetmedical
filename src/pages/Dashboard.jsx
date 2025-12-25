import { useEffect, useState } from "react";
import { TrendingUp, Users, CheckCircle, Star } from "lucide-react";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:4000";

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/patients`).then((res) => {
        if (!res.ok) throw new Error("Erreur patients");
        return res.json();
      }),
      fetch(`${API_URL}/rendezVous`).then((res) => {
        if (!res.ok) throw new Error("Erreur rendezVous");
        return res.json();
      }),
    ])
      .then(([patientsData, rendezVousData]) => {
        setPatients(patientsData);
        setRendezVous(rendezVousData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des données:", err);
        setLoading(false);
      });
  }, []);

  // --- Logic Calculations ---
  const prixConsultation = 300;
  const visitesHonorées = rendezVous.filter((r) => r.statut === "Honoré");
  const caMensuel = visitesHonorées.length * prixConsultation;

  const totalPatients = patients.length;

  const tauxPresence =
    rendezVous.length > 0
      ? ((visitesHonorées.length / rendezVous.length) * 100).toFixed(1)
      : 0;

  const getMostFrequentPatient = () => {
    if (rendezVous.length === 0) return "N/A";
    const counts = {};
    rendezVous.forEach((r) => {
      const name = r.patientName || r.patientId;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  const stats = [
    {
      label: "CA du Mois",
      value: `${caMensuel} DH`,
      icon: <TrendingUp className="text-green-600" />,
      color: "bg-green-50",
    },
    {
      label: "Nombre de Patients",
      value: totalPatients,
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Taux de Présence",
      value: `${tauxPresence}%`,
      icon: <CheckCircle className="text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      label: "Patient le plus fréquent",
      value: getMostFrequentPatient(),
      icon: <Star className="text-yellow-500" />,
      color: "bg-yellow-50",
    },
  ];

  if (loading)
    return <div className="p-10 text-center">Chargement des statistiques...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Indicateurs de performance du Cabinet Dr. Amrani
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}