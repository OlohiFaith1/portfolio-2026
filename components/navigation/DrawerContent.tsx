import type { DrawerMode } from './NavigationDrawer'
import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'
import { WorkSlideshow } from './WorkSlideshow'

interface Props {
  mode: DrawerMode
  isPlaying?: boolean
}

export function DrawerContent({ mode, isPlaying = false }: Props) {
  return (
    <>
      {/* ── MOBILE / TABLET (<lg): no slideshow, nav above social ── */}
      <div className="lg:hidden w-full h-[82vh] bg-[#0a0a0a] pointer-events-auto flex flex-col justify-between px-6 md:px-[59px] py-[40px]">
        <NavigationLinks mode={mode} mobile />
        <SocialLinks mode={mode} mobile />
      </div>

      {/* ── DESKTOP (≥lg): slideshow + absolute-positioned links ── */}
      <div className="hidden lg:block relative w-full h-[82vh] bg-[#0a0a0a] overflow-hidden pointer-events-auto">
        <div className="absolute inset-x-0 top-[48px] bottom-[48px] rounded-[12px] overflow-hidden">
          <WorkSlideshow isPlaying={isPlaying} />
        </div>

        <div
          className="absolute inset-y-0 left-0 w-[340px] pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0a0a0a 180px, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[120px] pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0a0a0a 40px, transparent)' }}
        />

        <NavigationLinks mode={mode} />
        <SocialLinks mode={mode} />
      </div>
    </>
  )
}
