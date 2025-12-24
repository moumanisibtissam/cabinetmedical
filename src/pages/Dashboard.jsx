import { Users, Calendar, FileText, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Patients", value: "428", icon: Users, color: "text-blue-600" },
  { label: "Today's Appointments", value: "15", icon: Calendar, color: "text-green-600" },
  { label: "Pending Consultations", value: "8", icon: FileText, color: "text-yellow-600" },
  { label: "Revenue (Month)", value: "45,200 DH", icon: TrendingUp, color: "text-purple-600" },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to your medical cabinet</p>
      </div>

      {/* Stats cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Upcoming appointments & recent consultations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Patient {i}</p>
                  <p className="text-xs text-gray-500">10:{i}0 AM - Consultation</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Consultations</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Consultation {i}</p>
                  <p className="text-xs text-gray-500">General checkup</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
