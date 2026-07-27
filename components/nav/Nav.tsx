'use client'

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-10 md:px-16 xl:px-24">
      <button
        type="button"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
        aria-label="Open menu"
      >
        Menu
      </button>
      <a
        href="#contact"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
      >
        Contact
      </a>
    </header>
  )
}
