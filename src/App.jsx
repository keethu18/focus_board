import { useState, useMemo } from "react";
import { ListTodo, Loader, CheckCircle2, Percent } from "lucide-react";
import useLocalStorage from "./hooks/useLocalStorage";
import { sampleTasks } from "./data/sampleTasks";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

export default function App() {
  // MASTER DATA: the full list, saved automatically to localStorage
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", sampleTasks);

  // UI state (not persisted)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);   // null = create mode
  const [deleteTarget, setDeleteTarget] = useState(null); // task waiting for confirmation
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------- DERIVED STATS (never hardcoded) ----------
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100); // avoid divide-by-zero

  // ---------- DERIVED FILTERED LIST ----------
  // useMemo recomputes only when its inputs change. The original `tasks` is never modified.
  const visibleTasks = useMemo(() => tasks.filter((t) =>
    t.title.toLowerCase().includes(search.trim().toLowerCase()) &&      // case-insensitive, partial match
    (statusFilter === "All" || t.status === statusFilter) &&            // status tab
    (priorityFilter === "All" || t.priority === priorityFilter)         // priority dropdown
  ), [tasks, search, statusFilter, priorityFilter]);                    // all three filters combine with &&

  // ---------- CRUD ----------
  const openCreate = () => { setEditingTask(null); setFormOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditingTask(null); };

  const saveTask = (data) => {
    if (editingTask) {
      // UPDATE: replace only the task with the same id; keep the original id
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...data, id: editingTask.id } : t)));
    } else {
      // CREATE: Date.now() gives a unique numeric id; new task goes to the top
      setTasks([{ ...data, id: Date.now() }, ...tasks]);
    }
    closeForm();
  };

  const changeStatus = (id, status) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));   // copy task, change status only

  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== deleteTarget.id));            // keep every task except the target
    setDeleteTarget(null);
  };

  const resetFilters = () => { setSearch(""); setStatusFilter("All"); setPriorityFilter("All"); };

  return (
    <div className="layout">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="content">
        <Header onMenu={() => setMenuOpen(!menuOpen)} onAdd={openCreate} />

        <section className="stats" aria-label="Overview statistics">
          <StatCard title="Total tasks" value={total} icon={ListTodo} />
          <StatCard title="In progress" value={inProgress} icon={Loader} />
          <StatCard title="Completed" value={completed} icon={CheckCircle2} />
          <StatCard title="Completion" value={`${percent}%`} icon={Percent} />
        </section>

        <FocusNotes />

        <section aria-label="Tasks">
          <SearchBar value={search} onChange={setSearch} />
          <FilterTabs status={statusFilter} priority={priorityFilter}
            onStatus={setStatusFilter} onPriority={setPriorityFilter} onReset={resetFilters} />

          {visibleTasks.length === 0 ? (
            <p className="empty">No tasks match your search or filters.</p>   
          ) : (
            <ul className="task-list">
              {visibleTasks.map((t) => (
                <TaskCard key={t.id} task={t} onEdit={openEdit}
                  onDelete={setDeleteTarget} onStatusChange={changeStatus} />
              ))}
            </ul>
          )}
        </section>
      </main>

      {formOpen && <TaskForm task={editingTask} onSave={saveTask} onCancel={closeForm} />}

      {deleteTarget && (
        <div className="overlay">
          <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="del-title">
            <h2 id="del-title">Delete task?</h2>
            <p>"{deleteTarget.title}" will be permanently removed.</p>
            <div className="form-actions">
              <button className="btn-ghost" onClick={() => setDeleteTarget(null)} autoFocus>Cancel</button>
              <button className="btn-danger" onClick={confirmDelete}>Confirm delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}