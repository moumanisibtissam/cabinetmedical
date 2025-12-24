import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';

export default function PatientDossier() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Find the patient by ID in the Redux list
  const patient = useSelector((state) => state.patients.list.find(p => p.id.toString() === id));

  if (!patient) return <div className="p-6">Patient not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-500 mb-6">
        <ArrowLeft size={18} /> Back to Patients
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Patient Info Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#006d77] mb-4">
            {patient.prenom[0]}{patient.nom[0]}
          </div>
          <h2 className="text-xl font-bold">{patient.prenom} {patient.nom}</h2>
          <p className="text-sm text-[#006d77] font-mono mb-4">{patient.dossierNum}</p>
          
          <div className="space-y-3 text-sm border-t pt-4">
            <p><strong>Age:</strong> {patient.age} years</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup || 'Not set'}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Allergies:</strong> <span className="text-red-500">{patient.allergies || 'None'}</span></p>
          </div>
        </div>

        {/* Right: Medical History Area (Required by Project 10) */}
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