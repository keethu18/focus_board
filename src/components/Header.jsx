// Header.jsx
import { Menu, Plus } from "lucide-react";

export default function Header({ onMenu, onAdd }) {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenu} aria-label="Open navigation menu"><Menu /></button>
      <h1>My Tasks Overview</h1>
      <button className="btn-primary" onClick={onAdd}><Plus size={18} /> Add Task</button>
    </header>
  );
}