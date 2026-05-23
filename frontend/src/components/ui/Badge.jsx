export default function Badge({ children, tone = 'pink' }) {
  const tones = {
    pink: 'bg-[#f9d7ea] text-[#8f1d61]',
    plum: 'bg-secondary text-white',
    purple: 'bg-[#eee8fb] text-secondary',
    neutral: 'bg-[#f5f2f7] text-[#3b3241]',
    urgent: 'bg-[#fff0f5] text-[#a21559] ring-1 ring-[#f2bad6]',
  }

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone] || tones.pink}`}>{children}</span>
}
