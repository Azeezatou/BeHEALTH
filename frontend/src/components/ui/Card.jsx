export default function Card({ children, className = '' }) {
  return <div className={`rounded-lg border border-[#ead8f3] bg-white shadow-sm ${className}`}>{children}</div>
}
