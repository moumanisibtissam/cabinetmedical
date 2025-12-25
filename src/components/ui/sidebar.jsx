import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Calendar, FileText, BarChart3, LogOut } from "lucide-react";



const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    label: "Rendez-vous",
    href: "/rendez-vous",
    icon: Calendar,
  },
  {
    label: "Consultations",
    href: "/consultations",
    icon: FileText,
  },
  {
    label: "Planning",
    href: "/planning",
    icon: BarChart3,
  },
]

export default function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">CA</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">Cabinet</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (

            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-[#007b83] text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
