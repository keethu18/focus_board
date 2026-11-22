// Sidebar.jsx
import { LayoutDashboard, ListTodo, CalendarDays, Settings } from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Tasks", icon: ListTodo },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: Settings },
];

// `open` controls the slide-in drawer on mobile; on desktop CSS always shows it
export default function Sidebar({ open, onClose }) {
  return (
    <nav className={open ? "sidebar open" : "sidebar"} aria-label="Main navigation">
      <div className="brand">FocusBoard</div>
      <ul>
        {items.map(({ label, icon: Icon }, i) => (
          <li key={label}>
            <a href="#" className={i === 0 ? "nav-link active" : "nav-link"}
               aria-current={i === 0 ? "page" : undefined} onClick={onClose}>
              <Icon size={18} aria-hidden="true" /> {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}