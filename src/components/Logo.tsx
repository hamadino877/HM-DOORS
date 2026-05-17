
interface LogoProps {
  className?: string
  color?: string
  showText?: boolean
  height?: number | string
}

export default function Logo({
  className = '',
  color = 'currentColor',
  showText = true,
  height = 50,
}: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <svg
        viewBox="0 0 120 70"
        height={height}
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-auto select-none"
        style={{ color }}
      >
        {/* Left vertical leg of the "H" */}
        <line x1="25" y1="18" x2="25" y2="60" />

        {/* Crossbar of the "H" connecting to the left side of the arch frame */}
        <line x1="25" y1="39" x2="42" y2="39" />

        {/* The arched door opening frame (Left leg, arch top, right leg) */}
        {/* Starts at bottom-left (42, 60), goes up to (42, 28), arches to (62, 28) with radius 10, then goes down to (62, 60) */}
        <path d="M 42,60 L 42,28 A 10,10 0 0,1 62,28 L 62,60" strokeWidth="4" />

        {/* Swung open Door Leaf (arched door panel slightly open to the right) */}
        {/* Bottom edge: pivoted at (42, 60) and swung out to (58, 62) */}
        {/* Top edge: pivoted at (42, 28) and swung out to (58, 20) */}
        {/* The curve connects top-pivot to top-swung edge, and right edge goes from top-swung to bottom-swung */}
        <path d="M 42,60 L 42,28 C 42,28 48,22 58,20 L 58,62 C 58,62 48,64 42,60 Z" fill="none" strokeWidth="2.8" />

        {/* Door handle/knob - represented as a filled circle (dot) */}
        <circle cx="53" cy="42" r="1.8" fill={color} stroke="none" />

        {/* The "M" on the right side */}
        {/* Shares the right edge of the arch frame or is very close, then diagonals down-right, up-right, then vertical down-right leg */}
        {/* First leg starts at the right leg of the arch (62, 28), middle V goes down to (77, 50), up to (92, 18), then vertical right leg down to (92, 60) */}
        <path d="M 62,28 L 62,60 L 77,48 L 92,18 L 92,60" strokeWidth="3.2" />
      </svg>
      {showText && (
        <span 
          className="font-['Tajawal'] font-bold uppercase tracking-[0.25em] text-xs mt-2 select-none"
          style={{ color }}
        >
          HM DOORS
        </span>
      )}
    </div>
  )
}
