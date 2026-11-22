const statuses = ["All", "To do", "In progress", "Completed"];

export default function FilterTabs({ status, priority, onStatus, onPriority, onReset }) {
  return (
    <div className="filters">
      <div className="tabs" role="tablist" aria-label="Filter by status">
        {statuses.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={status === s}                      
            className={status === s ? "tab active" : "tab"}
            onClick={() => onStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="sr-only" htmlFor="priority">Filter by priority</label>
      <select id="priority" value={priority} onChange={(e) => onPriority(e.target.value)}>
        <option value="All">All priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="btn-ghost" onClick={onReset}>Reset filters</button>
    </div>
  );
}