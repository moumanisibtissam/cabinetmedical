import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientDossier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  // 🔹 Charger le patient depuis JSON Server
  useEffect(() => {
    fetch(`http://localhost:4000/patients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Patient not found");
        return res.json();
      })
      .then((data) => setPatient(data))
      .catch((err) => console.error(err));
  }, [id]);

  // 🔹 Calculer l’âge
  const calculateAge = (birthDate) => {
    if (!birthDate) return "—";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (!patient) {
    return <div className="p-6 text-red-500">Patient not found</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 🔙 Retour */}
      <button
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-700"
      >
        <ArrowLeft size={18} /> Back to Patients
      </button>

      {/* 🧾 Dossier patient (plein largeur) */}
      <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* Avatar + Nom */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-[#006d77] mb-4">
            {patient.prenom?.[0]}{patient.nom?.[0]}
          </div>

          <h2 className="text-2xl font-bold">
            {patient.prenom} {patient.nom}
          </h2>

          <p className="text-sm text-[#006d77] font-mono">
            {patient.dossierNum}
          </p>
        </div>

        {/* Informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-t pt-6">
          <p><strong>Âge :</strong> {calculateAge(patient.birthDate)} ans</p>
          <p><strong>Groupe sanguin :</strong> {patient.groupeSanguin || 'Non renseigné'}</p>
          <p><strong>Téléphone :</strong> {patient.telephone}</p>
          <p>
            <strong>Allergies :</strong>{' '}
            <span className="text-red-500">
              {patient.allergies || 'aucune'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
