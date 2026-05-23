export default function Input({ className = '', label, textarea = false, ...props }) {
  const Field = textarea ? 'textarea' : 'input'

  return (
    <label className={`grid gap-2 text-sm font-medium text-[#29101e] ${className}`}>
      {label ? <span>{label}</span> : null}
      <Field
        className="min-h-11 rounded-md border border-[#dccde8] bg-white px-3 py-2 text-sm text-[#1f1724] outline-none transition placeholder:text-[#8f8096] focus:border-primary focus:ring-2 focus:ring-[#f9d7ea]"
        {...props}
      />
    </label>
  )
}
