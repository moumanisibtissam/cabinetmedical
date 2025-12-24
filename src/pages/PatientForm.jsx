import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPatient } from '../features/patientsSlice';

export default function PatientForm() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatient(formData));
    navigate('/patients'); // Go back to list after adding
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-gray-500 mb-4 flex items-center gap-2">
        ← Back to Patients
      </button>
      <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input required type="text" className="w-full border p-2 rounded-md" 
              onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input required type="text" className="w-full border p-2 rounded-md" 
              onChange={(e) => setFormData({...formData, nom: e.target.value})} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Birth Date *</label>
            <input required type="date" className="w-full border p-2 rounded-md" 
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input required type="tel" className="w-full border p-2 rounded-md" placeholder="+212 ..."
              onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="text" className="w-full border p-2 rounded-md" 
            onChange={(e) => setFormData({...formData, adresse: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border p-2 rounded-md" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blood Group</label>
            <select className="w-full border p-2 rounded-md" 
              onChange={(e) => setFormData({...formData, groupeSanguin: e.target.value})}>
              <option value="">Select group</option>
              <option value="A+">A+</option>
              <option value="O+">O+</option>
              {/* Add others */}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Allergies</label>
          <textarea className="w-full border p-2 rounded-md" rows="3"
            onChange={(e) => setFormData({...formData, allergies: e.target.value})}></textarea>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-[#006d77] text-white py-2 rounded-lg font-bold">
            Add Patient
          </button>
          <button type="button" onClick={() => navigate('/patients')} className="px-6 border py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}