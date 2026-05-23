export default function Modal({ children, isOpen, title }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-secondary">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
