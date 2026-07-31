import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'

interface Props {
  isPlaying?: boolean
}

export function DrawerContent(_props: Props) {
  return (
    <>
      {/* Mobile / tablet (<lg): tall vertical panel */}
      <div className="lg:hidden w-full h-[70svh] bg-white pointer-events-auto flex flex-col justify-between px-6 py-10">
        <NavigationLinks mobile />
        <SocialLinks mobile />
      </div>

      {/* Desktop (≥lg): compact horizontal bar */}
      <div className="hidden lg:flex w-full h-[184px] bg-white pointer-events-auto items-center px-[63px]">
        <div className="flex-1">
          <NavigationLinks />
        </div>
        <SocialLinks />
      </div>
    </>
  )
}
