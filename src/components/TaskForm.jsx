import { useState, useEffect } from "react";

const empty = { title: "", description: "", category: "Development", status: "To do", priority: "Medium", dueDate: "" };

// `task` is null when creating, or an existing task when editing. One form handles both.
export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(task ?? empty);   // prefill when editing
  const [errors, setErrors] = useState({});

  // Close the dialog when Escape is pressed (keyboard accessibility)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);  // cleanup avoids duplicate listeners
  }, [onCancel]);

  // One handler for every field: uses the input's `name` as the object key
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";   // trim() rejects spaces-only
    if (!form.dueDate) errs.dueDate = "Due date is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();                                          // stop the browser page reload
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;                    // any error: stop here
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="form-title" noValidate>
        <h2 id="form-title">{task ? "Edit task" : "Create task"}</h2>

        <label htmlFor="title">Title *</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} autoFocus
               aria-invalid={!!errors.title} aria-describedby="title-err" />
        {errors.title && <p id="title-err" className="error" role="alert">{errors.title}</p>}

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          <option>Design</option><option>Development</option><option>Testing</option><option>Research</option>
        </select>

        <div className="row">
          <div>
            <label htmlFor="status">Status *</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option>To do</option><option>In progress</option><option>Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority">Priority *</label>
            <select id="priority-f" name="priority" value={form.priority} onChange={handleChange}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
          </div>
        </div>

        <label htmlFor="dueDate">Due date *</label>
        <input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange}
               aria-invalid={!!errors.dueDate} aria-describedby="date-err" />
        {errors.dueDate && <p id="date-err" className="error" role="alert">{errors.dueDate}</p>}

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{task ? "Save changes" : "Create task"}</button>
        </div>
      </form>
    </div>
  );
}