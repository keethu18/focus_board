// Reusable card. Receives title, value and an icon COMPONENT through props.
export default function StatCard({ title, value, icon: Icon }) {
  // `icon: Icon` renames the prop to a capitalised name; JSX needs capitals for components
  return (
    <div className="stat-card">
      <Icon aria-hidden="true" size={22} />   {/* decorative icon, hidden from screen readers */}
      <div>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}