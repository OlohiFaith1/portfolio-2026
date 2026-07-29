import { AnimatedArrow } from './AnimatedArrow'

export function LandingHero() {
  return (
    <section className="h-[100svh] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 md:px-8">
        <div className="flex flex-col gap-4 md:gap-6 text-center w-[320px] max-w-full">
          <h1 className="font-display text-[26px] md:text-[32px] leading-[1.1] text-foreground">
            Ijelekhai Faith Olohijere
          </h1>
          <p className="text-[15px] md:text-[16px] leading-[1.55] tracking-[-0.2px] text-muted">
            I design digital products that are simple to use and enjoyable to interact with.
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.55] tracking-[-0.2px] text-muted">
            I&apos;m currently pursuing my MBA while exploring AI and building products with it.
          </p>
        </div>
      </div>

      <div className="pb-[6svh] md:pb-14 flex flex-col items-center gap-5">
        <p className="text-[16px] leading-[1.3] tracking-[-0.2px] text-foreground">
          Scroll to see my work.
        </p>
        <AnimatedArrow />
      </div>
    </section>
  )
}
