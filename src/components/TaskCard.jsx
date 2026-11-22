import { Pencil, Trash2 } from "lucide-react";

const statuses = ["To do", "In progress", "Completed"];

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <li className="task-card">
      <div className="task-main">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="meta">
          <span className="chip">{task.category}</span>
          {/* Priority is shown as TEXT plus a class, so colour is not the only indicator */}
          <span className={`chip priority-${task.priority.toLowerCase()}`}>{task.priority} priority</span>
          <span className="chip">Due {task.dueDate}</span>
        </div>
      </div>

      <div className="task-actions">
        {/* Status dropdown changes only this task, found by id in App */}
        <label className="sr-only" htmlFor={`status-${task.id}`}>Status for {task.title}</label>
        <select
          id={`status-${task.id}`}
          className={`status status-${task.status.replace(" ", "-").toLowerCase()}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>

        <button onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={18} /></button>
        <button onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={18} /></button>
      </div>
    </li>
  );
}