import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientDossier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  // ✅ Charger le patient depuis JSON Server
  useEffect(() => {
    fetch(`http://localhost:4000/patients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Patient not found");
        return res.json();
      })
      .then((data) => setPatient(data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ Fonction pour calculer l’âge
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

  if (!patient) return <div className="p-6 text-red-500">Patient not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-gray-500 mb-6"
      >
        <ArrowLeft size={18} /> Back to Patients
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Patient Info Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#006d77] mb-4">
            {patient.prenom?.[0]}{patient.nom?.[0]}
          </div>
          <h2 className="text-xl font-bold">{patient.prenom} {patient.nom}</h2>
          <p className="text-sm text-[#006d77] font-mono mb-4">{patient.dossierNum}</p>
          
          <div className="space-y-3 text-sm border-t pt-4">
            <p><strong>Age:</strong> {calculateAge(patient.birthDate)} years</p>
            <p><strong>Blood Group:</strong> {patient.groupeSanguin || 'Not set'}</p>
            <p><strong>Phone:</strong> {patient.telephone}</p>
            <p><strong>Allergies:</strong> <span className="text-red-500">{patient.allergies || 'None'}</span></p>
          </div>
        </div>

        {/* Right: Medical History Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Medical Record History</h3>
            <div className="py-10 text-center text-gray-400 border-2 border-dashed rounded-lg">
              No previous consultations recorded for this patient.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}