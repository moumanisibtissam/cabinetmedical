import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Vérifier que tous les champs obligatoires sont remplis
    const requiredFields = [
      "prenom",
      "nom",
      "birthDate",
      "telephone",
      "adresse",
      "email",
      "bloodGroup", // ✅ cohérent partout
      "allergies"
    ];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      alert("Veuillez remplir tous les champs avant d'ajouter un patient.");
      return;
    }

    // 🔹 Récupérer la liste des patients existants
    const res = await fetch("http://localhost:4000/patients");
    const patients = await res.json();

    // 🔹 Calculer le prochain numéro (ex: D01, D02…)
    const nextNum = patients.length + 1;
    const dossierNum = "D" + nextNum.toString().padStart(2, "0");

    // 🔹 Fusionner formData avec le numéro de dossier
    const patientData = { ...formData, dossierNum };

    // 🔹 Enregistrement dans JSON Server
    await fetch("http://localhost:4000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    });

    // Retour à la liste après ajout
    navigate('/patients');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-500 mb-4 flex items-center gap-2"
      >
        ← Back to Patients
      </button>
      <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              required
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="First Name"
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              required
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="Last Name"
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Birth Date *</label>
            <input
              required
              type="date"
              className="w-full border p-2 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              required
              type="tel"
              className="w-full border p-2 rounded-md"
              placeholder="+212 ..."
              value={formData.telephone || ""}
              onFocus={(e) => {
                if (!formData.telephone) {
                  setFormData((f) => ({ ...f, telephone: "+212" }));
                }
              }}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address *</label>
          <input
            required
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Address"
            onChange={(e) =>
              setFormData({ ...formData, adresse: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              required
              type="email"
              className="w-full border p-2 rounded-md"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blood Group *</label>
            <select
              required
              className="w-full border p-2 rounded-md"
              value={formData.bloodGroup || ""}
              onChange={(e) =>
                setFormData({ ...formData, bloodGroup: e.target.value })
              }
            >
              <option value="">Select group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Allergies *</label>
          <textarea
            required
            className="w-full border p-2 rounded-md"
            rows="3"
            placeholder="Allergies"
            onChange={(e) =>
              setFormData({ ...formData, allergies: e.target.value })
            }
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-[#006d77] text-white py-2 rounded-lg font-bold"
          >
            Add Patient
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="px-6 border py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}