import type { DrawerMode } from './NavigationDrawer'
import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'

interface Props {
  mode: DrawerMode
}

export function DrawerContent({ mode }: Props) {
  return (
    <div className="relative w-full h-[82vh] bg-[#0a0a0a] overflow-hidden">
      {/* Work slideshow placeholder — replaced with real content later */}
      <div className="absolute top-[39px] left-1/2 -translate-x-1/2 w-[562px] max-w-[calc(100%-32px)] h-[calc(100%-94px)] bg-white" />

      <NavigationLinks mode={mode} />
      <SocialLinks mode={mode} />
    </div>
  )
}
