import { Search } from "lucide-react";

// "Controlled input": the value comes from the parent's state and every keystroke updates it
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        placeholder="Search tasks by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}  // send typed text up to App
        aria-label="Search tasks by title"
      />
    </div>
  );
}