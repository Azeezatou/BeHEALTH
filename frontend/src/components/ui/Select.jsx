export default function Select({ children, className = '', label, ...props }) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-[#29101e] ${className}`}>
      {label ? <span>{label}</span> : null}
      <select
        className="min-h-11 rounded-md border border-[#dccde8] bg-white px-3 py-2 text-sm text-[#1f1724] outline-none transition focus:border-primary focus:ring-2 focus:ring-[#f9d7ea]"
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
