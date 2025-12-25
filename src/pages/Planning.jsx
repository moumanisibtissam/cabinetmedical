import { useEffect, useState } from "react";

export default function Planning() {
    const [rendezVous, setRendezVous] = useState([]);

    const API_URL = "http://localhost:4000";

    // Fetch rendezVous from json-server
    useEffect(() => {
        fetch(`${API_URL}/rendezVous`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Impossible de charger les rendez-vous");
                }
                return res.json();
            })
            .then((data) => setRendezVous(data))
            .catch((err) => console.error("Failed to fetch rendezVous:", err));
    }, []);

    // Stats cards data
    const stats = [
        {
            label: "Total Rendez-vous",
            value: rendezVous.length,
            color: "bg-blue-100",
            icon: "📅",
        },
        {
            label: "Honorés",
            value: rendezVous.filter((a) => a.statut === "Honoré").length,
            color: "bg-green-100",
            icon: "✅",
        },
        {
            label: "En attente",
            value: rendezVous.filter((a) => a.statut !== "Honoré").length,
            color: "bg-yellow-100",
            icon: "⏳",
        },
        {
            label: "Patients",
            value: new Set(rendezVous.map((a) => a.patientId)).size,
            color: "bg-purple-100",
            icon: "🧑‍⚕️",
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Planning & Analyse</h1>
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

            {/* Summary Table */}
            <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Détails des Activités</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b text-gray-400 text-sm">
                                <th className="py-3">Date</th>
                                <th className="py-3">Patient</th>
                                <th className="py-3">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rendezVous.slice(0, 5).map((app) => (
                                <tr key={app.id}>
                                    <td className="py-3 text-sm">{app.date}</td>
                                    <td className="py-3 text-sm font-medium">{app.patientId}</td>
                                    <td className="py-3 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-bold ${app.statut === "Honoré"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {app.statut}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {rendezVous.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="py-6 text-center text-gray-400">
                                        Aucun rendez-vous trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}