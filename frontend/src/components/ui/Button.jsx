import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-white shadow-sm hover:bg-[#bd2f83] focus-visible:ring-primary',
  secondary: 'bg-secondary text-white shadow-sm hover:bg-[#251052] focus-visible:ring-secondary',
  outline: 'border border-[#d7c7e7] bg-white/70 text-secondary hover:border-primary hover:bg-[#f9d7ea] focus-visible:ring-primary',
  ghost: 'text-secondary hover:bg-[#f9d7ea]/70 focus-visible:ring-primary',
}

export default function Button({ children, className = '', to, variant = 'primary', ...props }) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={props.type || 'button'} {...props}>
      {children}
    </button>
  )
}
