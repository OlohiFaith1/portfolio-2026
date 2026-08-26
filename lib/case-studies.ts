import type { CaseStudyStat } from '@/components/sections/CaseStudyStats'
import type { CaseStudyChapterData, CaseStudyParagraph } from '@/components/sections/CaseStudyChapter'

export interface CaseStudyContent {
  year: string
  org: string
  role: string
  title: string
  heroImage: { src: string; alt: string }
  stats: CaseStudyStat[]
  chapters: CaseStudyChapterData[]
}

// Real content only, mapped into Claude Design "Snow — Portfolio v2"'s
// Premise/Approach/Detail/Outcome chapter structure:
//  - Azza's chapters are the design's own authored essay copy, verbatim,
//    with stats/numbers corrected to match the live site's real figures
//    ($10M+ on-chain volume / 10,000+ users — confirmed as current over the
//    design mockup's draft $2M+/4,000+ figures).
//  - Mercado's Premise chapter is the design's own real (unbracketed) copy;
//    Approach/Detail/Outcome were bracketed placeholders in the design, so
//    they're written here from the real prose already shipped in
//    MercadoStudy2–6 (the "Our POS no get network" pain point, onboarding,
//    refunds, cashier management, closing statement) — no invented facts.
//  - Syncwatch has no chapter content in the design at all (falls back to
//    its scaffold); every chapter here is drawn from the real prose already
//    shipped in SyncWatchStudy2–8, including the real Billboard tagline
//    used verbatim as the case title.
export const CASE_STUDIES: Record<string, CaseStudyContent> = {
  azza: {
    year: '2025',
    org: 'Azza',
    role: 'Conversational Design',
    title: 'Making on-chain finance feel as simple as texting',
    heroImage: {
      src: '/azza/Pizza%20PNG.png',
      alt: 'Phone displaying an Azza cashback coupon on a pizza-themed tablecloth background',
    },
    stats: [
      { value: '$15M+', label: 'On-chain volume' },
      { value: '15,000+', label: 'Users' },
      { value: '4+', label: 'Markets' },
    ],
    chapters: [
      {
        no: '',
        label: 'The Backstory',
        head: 'Turning Chats to Cashouts',
        body: [
          'In 2025, Azza processed over $10M in onchain volume, entirely through WhatsApp. Azza enables everyday people and businesses to buy, sell, hold, and transact crypto without downloading an app or navigating complex trading interfaces.',
          'For the 10K plus users, their first onchain interaction didn’t happen in a traditional crypto wallet, it happened in a chat, on an already familiar interface; WhatsApp. Our goal was to turn a familiar messaging experience into a trustworthy, usable financial interface, capable of handling real money at scale.',
        ],
        youPaidAnimation: true,
        blocks: [
          {
            head: 'Solving a problem we had first.',
            body: [
              'We (the Blocverse team), were already receiving and spending money in crypto, but existing tools felt fragmented and unnecessarily complex. Managing wallets, tracking balances, and completing transactions often required jumping between multiple apps and interfaces that assumed a high level of crypto knowledge.',
              'What we wanted was simpler: a way to buy, sell, hold, and transact crypto from the same place we already communicated. The place was WhatsApp.',
            ],
          },
          {
            body: [
              [
                { text: 'In 2024, we entered the ' },
                { text: 'Base Around The World hackathon', href: 'https://devfolio.co/projects/azza-defi-fe69' },
                { text: ' with an early version of Azza, focused on making onchain transactions feel as easy as sending a message. Our submission (called Azza DeFi), alongside 22 others ' },
                { text: 'won the hackathon', href: 'https://blog.base.org/reflections-from-base-around-the-world#:~:text=Based%20Africa%20buildathon,Element%20Pay.' },
                { text: ', validating both the problem and the approach.' },
              ],
              'After the hackathon, Azza began to gain organic traction. People adopted it because it felt familiar! The traction pushed us to evolve Azza from a hackathon prototype into a production-ready WhatsApp crypto bot used by thousands.',
            ],
          },
        ],
        parts: [
          {
            type: 'videos',
            background: '#F5F5F5',
            videos: [
              { src: '/azza/videos/deposit-crypto.mp4', caption: 'Deposit' },
              { src: '/azza/videos/generate-statement.mp4', caption: 'Generate Statement' },
              { src: '/azza/videos/balance.mp4', caption: 'Check Balance' },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'The Challenge',
        head: 'How do we design for WhatsApp?',
        body: [
          'Designing Azza meant creating a financial experience entirely within WhatsApp’s native interface. With no custom components, navigation, or visual hierarchy to build from scratch, we had to work within the constraints of messages, buttons, spacing, order, and timing.',
          'This meant every message had to be clear enough to stand on its own, safe to act on with real money, and capable of guiding users without relying on extensive visual context.',
          'We couldn’t assume users would scroll back, remember previous steps, or understand crypto-specific patterns.',
        ],
        figure: {
          src: '/images/azza/hero/ideation-session.jpg',
          alt: 'The Azza team gathered around a whiteboard sketching app flows during an ideation session',
          caption: 'One of our many ideation sessions',
        },
      },
      {
        no: '',
        label: 'The Process',
        head: 'Building for real users',
        body: [
          'Winning Base Around The World 2024 validated the idea and showed that WhatsApp could support real financial flows. From there, we focused on designing the experience for real users, refining each flow to make transactions clearer and easier to navigate.',
        ],
        parts: [
          {
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '/images/azza/Azza%20Asset---.png',
                alt: 'Phone mockup showing WhatsApp chat with Azza’s "Submit KYC details" flow',
                width: 1245,
                height: 1879,
              },
              {
                src: '/images/azza/Azza%20Asset%2012.png',
                alt: 'Phone mockup showing an Azza NGN withdrawal receipt and a Solana cashback notification',
                width: 1245,
                height: 1879,
              },
            ],
          },
          { type: 'heading', text: 'Mapping the core flows' },
          {
            type: 'paragraphs',
            body: [
              'As usage grew, we had to design for real user behavior, including unexpected inputs, skipped steps, and unfamiliar crypto terminology.',
              'We mapped hundreds of scenarios across onboarding, security, trading, deposits, withdrawals, confirmations, and error states to make the experience reliable and easy to follow.',
            ],
          },
          {
            type: 'gallery',
            images: [
              {
                src: '/images/azza/FigJam%20Explorations.png',
                alt: 'FigJam board mapping Azza’s WhatsApp bot conversation flows, including welcome, help, balance, and payment paths',
                caption: 'Some of our explorations on FigJam',
              },
            ],
          },
          {
            type: 'callout',
            text: [
              { text: 'Designing Azza was a team sport.', bold: true },
              { text: ' Product, design, and engineering iterated together, often staying up all night to test decisions, solve constraints, and refine flows.' },
            ],
          },
          { type: 'heading', text: 'Testing, Iteration & Building Trust' },
          {
            type: 'paragraphs',
            body: [
              'A large part of Azza’s growth came from learning directly from users. We tested the bot at events, handled customer support ourselves, and reached out to users who never completed their first transaction. This helped us uncover concerns around security, crypto terminology, and confidence during transactions.',
            ],
          },
          {
            type: 'framedImages',
            background: '#F5F5F5',
            images: [
              {
                src: '/azza/Azza%20Study%205-%20PNG%201.png',
                alt: 'Azza GHS withdrawal receipt showing a completed transaction',
                width: 1297,
                height: 2650,
              },
              {
                src: '/azza/Azza%20Study%205-%20PNG%202.png',
                alt: 'Azza NGN withdrawal receipt showing a completed transaction',
                width: 1297,
                height: 2650,
              },
              {
                src: '/azza/Azza%20Study%205-%20PNG%203.png',
                alt: 'Azza bill payment receipt showing a completed data bundle purchase',
                width: 1297,
                height: 2650,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              'We used these insights to continuously refine transaction flows, error states, confirmations, and user education. At the same time, we focused on making Azza feel more human through small but important touchpoints like receipts, rate cards, and post-transaction summaries.',
            ],
          },
          {
            type: 'couponCarousel',
            caption: 'Coupon cards',
          },
          {
            type: 'paragraphs',
            body: [
              'This thinking extended beyond the bot to the landing page, creating a consistent visual identity that helped users understand and trust Azza before making their first transaction.',
            ],
          },
        ],
      },
      {
        no: '',
        label: 'Outcome',
        head: 'Results & Impact',
        body: [
          'Azza grew into a product users trusted by combining familiar UX patterns with continuous iteration.',
          [
            { text: 'In 2025, Azza processed ' },
            { text: '$10M+ in onchain volume', href: 'https://x.com/useazza/status/2006471824197161260?s=20' },
            { text: ', reached ' },
            { text: '10,000+ users', bold: true },
            { text: ', completed ' },
            { text: '46,000+ trades', bold: true },
            { text: ', and expanded across ' },
            { text: '4+ countries', bold: true },
            { text: '. We also collaborated with ecosystem partners including Base, Lisk Africa, and Solana Superteam NG.' },
          ],
        ],
        parts: [
          {
            type: 'gallery',
            crop: false,
            images: [
              {
                src: '/images/azza/Testimonials-main.png',
                alt: 'Collage of tweets and social media testimonials about Azza',
                width: 4436,
                height: 5380,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              [
                { text: 'More importantly, users described Azza as ' },
                { text: 'simple, trustworthy, and easy to use', bold: true },
                { text: ', validating the experience we set out to build.' },
              ],
            ],
          },
          { type: 'divider' },
          {
            type: 'paragraphs',
            body: [
              'I had the privilege of working alongside an incredible team who brought different perspectives, skills, and ideas to every stage of Azza. We had people multitasking and taking on wildly different roles at the same time, and it was so amazing to see.',
            ],
          },
          { type: 'heading', text: 'Credits' },
          {
            type: 'credits',
            groups: [
              { role: 'Design', names: 'Ijelekhai Faith Olohijere, James Ogechi Emmanuella' },
              { role: 'Engineering', names: 'Avoaja Joshua, Toochukwu Okoro, Chukwu Chukwuemeka, Agbo Stanley' },
              { role: 'Product & Operations', names: 'Victor Eluke' },
              { role: 'Marketing & Social Media Manager', names: 'Ezichi Chikamso' },
            ],
          },
        ],
      },
    ],
  },

  mercado: {
    year: '2025',
    org: 'Passion project',
    role: 'Sole designer',
    title: 'Protecting merchant earnings from the currency they earn in',
    heroImage: {
      src: '/images/mercado/mercado-4-thumbnail.jpg',
      alt: 'A merchant holds a phone showing a completed 25 USDC collection in the Mercado app, next to the headline "Our POS no get network..."',
    },
    stats: [
      { value: '2', label: 'Currencies' },
      { value: '3', label: 'Core flows' },
      { value: 'Solo', label: 'Design team' },
    ],
    chapters: [
      {
        no: '01',
        label: 'Premise',
        head: 'Earnings that lose value between the sale and the payout',
        body: 'Mercado started from a question I couldn’t stop asking: what does a payment tool look like when the currency itself is the risk? Designed to reduce friction in cross-border commerce and protect earnings from currency instability, it’s my way of exploring how design can empower small businesses in high-inflation economies.',
        figure: {
          src: '/images/mercado/mercado-onboarding-1.png',
          alt: 'Mercado onboarding welcome screen, with a "Create an account" button',
          caption: 'Where value leaks in a cross-border sale.',
        },
      },
      {
        no: '02',
        label: 'Approach',
        head: 'Designing around a familiar point of failure',
        body: 'You’ll hear that phrase in supermarkets, kiosks and roadside stalls anytime a payment fails: the POS machine can’t connect, the bank app is down, or money is debited but never received. Mercado is a simple mobile app that lets everyday merchants manage stablecoin payments like they would regular money, without the technical crypto jargon getting in the way. Onboarding stays deliberately plain — an email and password, a 4-digit code sent to that email, then straight to the homepage.',
        figure: {
          src: '/images/mercado/mercado-onboarding-3.png',
          alt: 'Mercado verification screen with four one-time-passcode input boxes',
          caption: 'Onboarding: email, one code, done.',
        },
      },
      {
        no: '03',
        label: 'Detail',
        head: 'A reason, not just a rejection',
        body: 'Refund requests from cashiers can be approved or rejected by the merchant. If a merchant rejects one, they have to say why — a small piece of required friction, added deliberately so the customer on the other end gets an actual explanation instead of a silent no.',
        figure: {
          src: '/images/mercado/mercado-refund-reject.png',
          alt: 'Mercado reject refund screen prompting the merchant to enter a reason for rejecting the refund',
          caption: 'Rejection requires a reason, every time.',
        },
      },
      {
        no: '04',
        label: 'Outcome',
        head: 'Complexity was never the merchant’s problem to solve',
        body: 'Mercado also lets merchants manage cashier accounts across branches — adding, deactivating, keeping track of who can collect on their behalf. Taken together, Mercado proves that the power of crypto doesn’t have to come with complexity. I designed the experience around how real merchants work, making stablecoin payments easy and clear to use.',
        figure: {
          src: '/images/mercado/iPhone 15 Pro Front 1.png',
          alt: 'Mercado "Cashier Accounts" screen listing cashiers with activate/deactivate controls',
          caption: 'Cashier management, across branches.',
        },
      },
    ],
  },

  syncwatch: {
    year: '2026',
    org: 'Independent',
    role: 'User Experience & Interface Design',
    title: "Watch together, even when you're apart",
    heroImage: {
      src: '/images/syncwatch/Billboard.png',
      alt: "A roadside billboard mockup reading 'Watch together, even when you're apart.' beside the SyncWatch logo, over a photo of two people looking at a phone together",
    },
    stats: [
      { value: 'Real-time', label: 'Synced playback' },
      { value: 'Multi-platform', label: 'Streaming support' },
      { value: 'Chat + reactions', label: 'In-watch social' },
    ],
    chapters: [
      {
        no: '01',
        label: 'Premise',
        head: 'Too many tools just to press play at the same time',
        body: 'Watching a movie remotely usually means juggling a video call, a streaming platform, and messages just to stay in sync. SyncWatch brings the experience together, from creating a party and inviting friends to watching, chatting, and reacting in real time.',
        figure: {
          src: '/images/Syncwatch 2 Image.png',
          alt: 'SyncWatch onboarding screens for signing in and selecting a streaming service, alongside two user quotes about wanting to watch movies together virtually',
          caption: 'Signing in and choosing a streaming service.',
        },
      },
      {
        no: '02',
        label: 'Approach',
        head: 'A watch party in three steps',
        body: 'Create a watch party, choose what to watch, and share the invite with your friends. Once everyone is in, SyncWatch keeps playback synchronized across every device — no separate call, no manual "pause... okay go" over text.',
        figure: {
          src: '/images/syncwatch/Syncwatch 4 Image(2).png',
          alt: 'SyncWatch modal offering to create a watch party for "The Unforgivable"',
          caption: 'Starting a watch party.',
        },
      },
      {
        no: '03',
        label: 'Detail',
        head: 'The lobby, and the summary after',
        body: 'The party lobby shows who’s ready before the movie starts, while in-watch chat and reactions let everyone stay connected without leaving the experience. When the movie ends, the party doesn’t just disappear — a summary brings the session back together, showing what was watched, how long the party lasted, and everyone who joined.',
        figure: {
          src: '/images/syncwatch/SyncWatch 5 Image (1).png',
          alt: 'Ten circular party-guest avatars overlaid on a photo of someone holding a remote control beside a bowl of popcorn',
          caption: 'Who’s in the party, before it starts.',
        },
      },
      {
        no: '04',
        label: 'Outcome',
        head: 'Where it landed',
        body: 'SyncWatch started with a simple idea: making it easier to watch movies with friends, even when you’re not in the same place. I explored how synchronized playback, watch parties, chat, and shared moments could come together without making the experience complicated. The goal was to make watching together feel natural and social, while making the distance between friends feel a little smaller.',
        figure: {
          src: '/images/syncwatch/Syncwatch 8 (Image 1).png',
          alt: 'A four-screen sequence of a SyncWatch watch party in session: the party lobby before starting, synchronized video playback with live messages, a friend replying in chat, and the end-of-party summary with an option to host another party',
          caption: 'SyncWatch, in session.',
        },
      },
    ],
  },
}

// Flattens a paragraph (plain string, or link/bold segments) down to its
// words for the reading-time estimate below.
function paragraphText(p: CaseStudyParagraph): string {
  return typeof p === 'string' ? p : p.map((seg) => seg.text).join(' ')
}

function bodyText(body: string | CaseStudyParagraph[]): string {
  return Array.isArray(body) ? body.map(paragraphText).join(' ') : body
}

export function getReadingTime(content: CaseStudyContent): string {
  const words = content.chapters
    .map((c) => {
      const blockText = (c.blocks ?? [])
        .map((b) => `${b.head ?? ''} ${b.body ? bodyText(b.body) : ''}`)
        .join(' ')
      const partText = (c.parts ?? [])
        .map((p) => {
          if (p.type === 'heading') return p.text
          if (p.type === 'paragraphs') return bodyText(p.body)
          if (p.type === 'callout') return paragraphText(p.text)
          return ''
        })
        .join(' ')
      return `${c.head} ${bodyText(c.body)} ${c.quote ?? ''} ${blockText} ${partText}`
    })
    .join(' ')
    .trim()
    .split(/\s+/).length
  return `${Math.max(2, Math.round(words / 200))} min read`
}
