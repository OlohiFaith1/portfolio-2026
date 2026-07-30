import type { DrawerMode } from './NavigationDrawer'
import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'
import { GallerySlideshow } from './WorkSlideshow'

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

      {/* ── DESKTOP (≥lg): phone mockup + absolute-positioned links ── */}
      <div className="hidden lg:block relative w-full h-[82vh] bg-[#0a0a0a] overflow-hidden pointer-events-auto">
        {/* Phone mockup — scales to fit drawer height, 48px vertical padding, horizontally centred */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: 'min(820px, calc(82vh - 96px))',
            aspectRatio: '401 / 820',
            borderRadius: 48,
            overflow: 'hidden',
            backgroundColor: '#000',
          }}
        >
          <GallerySlideshow isPlaying={isPlaying} />
        </div>

        <NavigationLinks mode={mode} />
        <SocialLinks mode={mode} />
      </div>
    </>
  )
}
