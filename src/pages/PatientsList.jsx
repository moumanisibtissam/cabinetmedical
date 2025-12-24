import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PatientsList() {
  // Get the list from Redux state
  const patients = useSelector((state) => state.patients.list);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-500">Manage your patient directory</p>
        </div>
        <Link 
          to="/patients/ajouter" 
          className="bg-[#006d77] text-white px-4 py-2 rounded-lg hover:bg-[#005f66]"
        >
          + Add Patient
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {patients.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No patients found. Add your first patient to get started.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-400 uppercase">
                <th className="pb-3">Dossier #</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Age</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-mono text-[#006d77] font-bold">{p.dossierNum}</td>
                  <td className="py-4">{p.prenom} {p.nom}</td>
                  <td className="py-4">{p.age} years</td>
                  <td className="py-4">
                    <Link 
                      to={`/patients/${p.id}`} 
                      className="text-[#006d77] font-semibold hover:underline"
                    >
                      Voir dossier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}