export default function StatsCard({ value, title, isAccent = true }) {
  return (
    <div className="stats-card">
      <h2 className={isAccent ? "accent-crimson" : ""}>{value}</h2>
      <p>{title}</p>
    </div>
  );
}