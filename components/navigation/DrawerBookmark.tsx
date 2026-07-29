interface Props {
  isOpen: boolean
  onToggle: () => void
  align: 'right' | 'center'
}

export function DrawerBookmark({ isOpen, onToggle, align }: Props) {
  return (
    <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-end pr-2 lg:pr-[61px]'}`}>
      {/*
        pointer-events-auto overrides the parent motion div's pointer-events-none
        so the bookmark remains clickable in the closed state on non-landing pages.
      */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="block w-[36px] h-[54px] lg:h-[74px] cursor-pointer pointer-events-auto"
      >
        <img
          src="/bookmark.svg"
          alt=""
          aria-hidden="true"
          className="size-full"
        />
      </button>
    </div>
  )
}
