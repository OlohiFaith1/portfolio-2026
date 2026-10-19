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

  flyp: {
    year: '2026',
    org: 'Flyp',
    role: 'Product Design and Motion Ideation',
    // Real, existing tagline for Flyp — already used as its Work Grid
    // description in lib/work-projects.ts — reused here rather than writing
    // a new headline, since no hero title copy was given for this case study.
    title: 'A Figma plugin for exporting motion, made simpler.',
    heroImage: { src: '/images/flyp/Flyp%20Case%20Study%20Cover.png', alt: 'Flyp case study cover image' },
    stats: [
      { value: 'Figma-native', label: 'Motion within the design workflow' },
      { value: 'Motion-ready', label: 'Turn static designs into motion' },
      { value: 'No rebuild', label: 'Animate existing Figma designs' },
    ],
    chapters: [
      {
        no: '',
        label: 'The Backstory',
        head: 'Where static designs start moving.',
        body: [
          [
            { text: 'In late 2025, I briefly joined Superflous, a design agency led by ' },
            { text: 'Demilade Olaleye', href: 'https://ph.demiladehq.com/' },
            {
              text: ', where I had the opportunity to contribute to some really exciting projects. Flyp is the one I’m most proud of — a Figma plugin built to bridge the gap between static Figma designs and motion.',
            },
          ],
          'I contributed to the plugin experience, working on parts of the product interface and exploring motion concepts for its launch videos.',
          'It was an interesting blend of product design and motion, and one that pushed me to think beyond the usual.',
        ],
      },
      {
        no: '',
        label: 'The Challenge',
        head: 'What happens when a static design needs to move?',
        body: 'Designers can create detailed interfaces in Figma, but bringing those designs to life or presenting them with motion often means leaving Figma and starting again in another tool.',
        parts: [
          {
            // Both slots are real flyp clips now, each rendered uncropped at
            // its own natural aspect ratio (see CaseStudyInlineVideo) rather
            // than forced into the usual object-fit:cover treatment.
            // layout:'column' + crop:false matches every other multi-image
            // gallery already in this file (Azza/SyncWatch) rather than the
            // otherwise-unused row-grid default.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '',
                alt: 'Flyp case study video — leaving Figma to animate elsewhere (1 of 2)',
                video: '/flyp-0147.mp4',
                width: 1920,
                height: 1200,
              },
              {
                src: '',
                alt: 'Flyp case study video — leaving Figma to animate elsewhere (2 of 2)',
                video: '/images/flyp/Comp_1w_35.mp4',
                // The file's encoded pixel buffer is 1920×1080, but it carries
                // a non-square pixel aspect ratio (SAR 9:16) that makes its
                // true displayed shape a 1:1 square — confirmed via ffprobe's
                // display_aspect_ratio and matched by the browser's own
                // reported videoWidth/videoHeight. Using the true display
                // size here (not the raw encoded one) keeps this layout hint
                // in sync with what <video> actually renders once loaded.
                width: 1920,
                height: 1920,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'The Solution',
        head: 'Bringing motion into the Figma workflow.',
        body: 'Flyp brings motion into the Figma workflow, allowing designers to take their existing designs and explore animation without having to rebuild everything from scratch.',
        parts: [
          {
            // First slot is the real Fraymer.png asset, rendered uncropped
            // at its own 1826×1686 aspect ratio (crop:false, matching every
            // other multi-media gallery in this file). Second slot is the
            // real Fraymer-Video 1.mp4 clip, rendered uncropped at its own
            // 720×900 (4:5) aspect ratio (see CaseStudyInlineVideo). Third
            // (final) slot is the real Fraymer- Again.mp4 clip, rendered
            // uncropped at its own 720×720 (1:1) aspect ratio.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '/images/flyp/Fraymer.png',
                alt: 'A Figma canvas of low-fidelity wireframes and layout explorations for Fraymer, the team behind Flyp',
                caption: 'A screenshot of our Figma canvas',
                width: 1826,
                height: 1686,
              },
              {
                src: '',
                alt: 'Flyp case study video — motion inside the Figma workflow (2 of 3)',
                video: '/images/flyp/Fraymer-Video%201.mp4',
                width: 720,
                height: 900,
              },
              {
                src: '',
                alt: 'Flyp case study video — motion inside the Figma workflow (3 of 3)',
                video: '/images/flyp/Fraymer-%20Again.mp4',
                width: 720,
                height: 720,
              },
            ],
          },
        ],
      },
    ],
  },

  // Independent design project (not a Silverbird commission) — copy is the
  // approved first draft, verbatim apart from minor punctuation. Every
  // visual after the hero is an exported screen or a walkthrough rendered
  // from the exports, and stays within the reading column (no `wide`), so
  // all of them share the text's own width and edges.
  silverbird: {
    year: '2025',
    org: 'Silverbird Cinemas',
    role: 'Web Design, User Experience and Interface Design',
    title: 'A platform for managing corporate ticket partnerships.',
    heroImage: {
      src: '/images/Silverbird%20Cover.png',
      alt: 'A desktop monitor beside a Mac mini, showing the platform’s home dashboard with ticket totals and a recent activity table',
    },
    stats: [{ value: 'Ticket management' }, { value: 'Ticket operations' }, { value: 'Ticket validation' }],
    chapters: [
      {
        no: '',
        label: 'The Backstory',
        head: 'Managing the journey from partnership to ticket.',
        body: [
          'Corporate partnerships can involve more than agreeing to work together. Once a partnership is confirmed, tickets need to be generated, shared with the right people, and validated when they arrive at the cinema.',
          'This project explored how those operations could be managed through a single web platform, giving cinema staff a way to manage partner records and handle the ticket workflow that follows.',
          'This was an independent design project informed by research conducted by someone who interned at Silverbird Cinemas.',
        ],
        parts: [
          {
            // Super Admin onboarding walkthrough: a camera-only recording of the
            // three exported screens (sign-in → code → code entered), rendered in
            // jobmate-motion-studio's `silverbird-onboarding` scene at 1440×1024
            // (the exports' 5760×4096 ratio).
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '',
                alt: 'Walkthrough of the Super Admin onboarding screens: sign in with an email address, then enter the six-digit verification code',
                video: '/images/silverbird/silverbird-onboarding.mp4',
                width: 1440,
                height: 1024,
                videoControls: true,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'The Challenge',
        head: 'Keeping partner and ticket operations connected.',
        body: [
          'The experience needed to support two connected parts of the workflow: managing corporate partners and handling the tickets created for them.',
          'Staff needed to be able to check whether a partner already existed, generate the right number and type of tickets, choose the included menu items, and define when those tickets were valid.',
          'After generation, the tickets would be downloaded and shared with the partner. At the cinema, staff would need a way to validate each ticket and review its status.',
          'The design brought these tasks together in one operational interface, with access organised around the responsibilities of different staff roles.',
        ],
        parts: [
          {
            // Caption spelling ("archtypes") is as provided — keep it verbatim.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '/images/silverbird/Screenshot%202026-10-15%20at%2011.40.19.png',
                alt: 'Figma canvas with the screens grouped into three columns: Admin Management for Super Admins, Admin for regular Admins, and Sales Agent',
                caption: 'Screenshot of the three user archtypes.',
                width: 1824,
                height: 1620,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'The Solution',
        head: 'One workflow, from partner records to ticket validation.',
        body: [
          'The platform centres on partner management. Once management confirms a partnership, the Super Admin checks whether the company is already listed and adds it if it is not.',
        ],
        parts: [
          {
            // Partner Management walkthrough (add, rename, delete a partner), rendered in
            // jobmate-motion-studio's `silverbird-partners` scene at 1440×1024 from the four
            // Partners exports in this folder.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '',
                alt: 'Walkthrough of Partner Management: adding a partner, renaming a partner inline, and deleting a partner after confirming',
                video: '/images/silverbird/silverbird-partners.mp4',
                width: 1440,
                height: 1024,
                videoControls: true,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              'From there, tickets can be generated for the selected partner. Staff configure the quantity, choose between VVIP, Regular, and Gift Voucher tickets, select available menu items, and set the validity period. The generated tickets can then be downloaded and shared with the partner.',
            ],
          },
          {
            // Generate Tickets: the two exported screens as static images, unfilled then
            // Gift Vouchers filled, each on the light grey canvas card.
            type: 'canvasImages',
            images: [
              {
                src: '/images/silverbird/Generate%20Tickets%20(Unfilled).png',
                alt: 'The empty Generate Tickets form: partner, number of tickets, ticket type, menu and validity range, beside an empty preview',
                width: 5760,
                height: 4096,
              },
              {
                src: '/images/silverbird/Generate%20Tickets-%20Gift%20Vouchers%20(Filled)%20(Desktop).png',
                alt: 'The Generate Tickets form completed for 78 Gift Voucher tickets for Wema Bank, with menu items selected and the preview showing the price per ticket and validity range',
                width: 5760,
                height: 4096,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              'Each ticket includes a QR code and a unique Ticket ID. Staff can validate a ticket by scanning its QR code or entering its ID manually.',
            ],
          },
          {
            // The two ways to validate a ticket, as separate walkthroughs (QR scan first), rendered
            // in jobmate-motion-studio's `silverbird-validate-qr` / `silverbird-validate-id` scenes
            // at 1440×1024 from the seven Validate Ticket exports in this folder.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '',
                alt: 'Validating a ticket by scanning its QR code: choosing Scan QR Code, the ticket in the camera viewfinder, then the Valid Ticket result',
                caption: 'Scan QR Code',
                video: '/images/silverbird/silverbird-validate-qr.mp4',
                width: 1440,
                height: 1024,
                videoControls: true,
              },
              {
                src: '',
                alt: 'Validating a ticket by entering its Ticket ID: choosing Enter Ticket ID, typing the six characters, then the Valid Ticket result',
                caption: 'Enter Ticket ID',
                video: '/images/silverbird/silverbird-validate-id.mp4',
                width: 1440,
                height: 1024,
                videoControls: true,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              'The platform also includes a history view that brings ticket details into one place, including the Ticket ID, price, partner name, generation date, scanning staff member, and ticket status.',
            ],
          },
          {
            type: 'canvasImages',
            images: [
              {
                src: '/images/silverbird/History-Gift%20Vouchers%20(Desktop).png',
                alt: 'The History page on the Gift Vouchers tab, listing tickets with their Ticket ID, price, scanning staff member, partner, generation date and status',
                caption: 'Screenshot of Gift Voucher History',
                width: 5760,
                height: 4096,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'Designing for Different Roles',
        head: 'Different responsibilities, a shared overview.',
        body: [
          'The platform has three roles: Super Admin, Admin, and Sales Agent.',
          'The Super Admin has access to partner management, ticket generation, history, staff management, menu management, notifications, and ticket validation. Admins can generate tickets, view history, scan tickets, and access notifications. Sales Agents can view history, scan tickets, and access notifications.',
          'Each role has a similar dashboard, with cards showing the total number of tickets, used tickets, and expired tickets. A recent activity table, organised with tabs for ticket types, provides another view of ticket activity.',
        ],
        parts: [
          {
            type: 'canvasImages',
            images: [
              {
                src: '/images/silverbird/Sales%20Agent-%20Ticket%20Batch.png',
                alt: 'A Sales Agent’s Ticket Batch page, with a summary of the batch above a table of its tickets showing Ticket ID, price, scanning staff member, partner, generation date and status',
                caption: 'Sales agent ticket batching',
                width: 5760,
                height: 4096,
              },
            ],
          },
          {
            type: 'paragraphs',
            body: [
              'Staff accounts capture a username, branch, and password. The branch field identifies the cinema location associated with each staff member, supporting accountability across multiple branches.',
            ],
          },
          {
            type: 'canvasImages',
            images: [
              {
                src: '/images/silverbird/Settings-%20Sales%20Agent%20Management.png',
                alt: 'Settings on the Sales Agent Management tab, listing sales agents with their username, branch, hidden password and date added, with an open menu to reset a password or delete an account',
                caption: 'Admin settings for managing staff accounts',
                width: 5760,
                height: 4096,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'Menu Management',
        head: 'Making ticket selections visible before generation.',
        body: [
          'When generating tickets, staff can select the food and drinks included with a ticket. The menu field lets them choose from available items, while the preview on the right updates to reflect their selections.',
          'The walkthrough demonstrates how staff can select multiple items, review the completed ticket details, and initiate ticket generation. This keeps the selected menu items visible alongside the rest of the ticket information before the tickets are generated.',
        ],
        parts: [
          {
            // Menu selection on Generate Tickets: a walkthrough built in the motion studio
            // (silverbird-menu) from the Unfilled, Select Menu and Generating in Progress exports.
            // Its grey canvas is in the video, so it takes the canvasImages cards' 24px radius.
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '',
                alt: 'Choosing menu items while generating tickets: the menu field opens its list, items are ticked, and the preview lists them before the tickets generate',
                video: '/images/silverbird/silverbird-menu.mp4',
                width: 1440,
                height: 1024,
                videoControls: true,
                radius: 24,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'In Closing',
        body: 'The project brought partner management, ticket generation, validation, and ticket history into a single operational experience, designed around the responsibilities of cinema staff.',
      },
    ],
  },

  syncwatch: {
    year: '2026',
    org: 'SyncWatch',
    role: 'User Experience & Interface Design',
    title: 'Watch together, wherever you are',
    heroImage: {
      src: '/images/syncwatch/SyncWatch 1.png',
      alt: 'A woman smiling at her laptop screen at night, with the SyncWatch logo mark overlaid in the center of the frame',
    },
    stats: [
      { value: 'Real-time', label: 'Synced playback' },
      { value: 'Multi-platform', label: 'Streaming support' },
      { value: 'Chat + reactions', label: 'In-watch social' },
    ],
    chapters: [
      {
        no: '',
        label: 'The Backstory',
        head: 'Making Virtual Watch Parties Feel Good',
        body: [
          'Watching a movie remotely shouldn’t mean juggling a streaming platform, a video call, and a group chat just to stay in sync.',
          'SyncWatch is a mobile app that lets people watch movies together on their preferred streaming platforms while keeping playback synchronized across devices.',
          'As the UX & Interface Designer, I designed the experience from creating a watch party to choosing a movie, inviting friends, and getting everyone into the same synchronized viewing experience.',
        ],
        syncwatchLogoFlicker: true,
      },
      {
        no: '',
        label: 'The Problem',
        head: 'Watching together had become a coordination problem',
        body: [
          'Watching a movie with friends remotely often means moving between different apps just to recreate something that happens naturally in the same room. Different apps handle the movie, the conversation, and the messages, and at some point everyone falls out of sync.',
          'I wanted to explore whether the experience could feel more connected by bringing the important parts of a watch party into one place, while still letting people watch on the streaming platforms they already use.',
        ],
        parts: [
          {
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '/images/syncwatch/SyncWatch 5 Image (1).png',
                alt: 'Ten circular party-guest avatars overlaid on a photo of someone holding a remote control beside a bowl of popcorn',
                width: 2344,
                height: 1656,
              },
              {
                src: '/images/syncwatch/SyncWatch 5 Image (2).png',
                alt: 'A SyncWatch watch-party screen with synced video playback and live chat messages, overlaid on a photo of two friends laughing together outdoors',
                width: 2344,
                height: 1656,
              },
              {
                src: '/images/syncwatch/SyncWatch 5 Image (3).png',
                alt: 'A SyncWatch modal for sharing a watch-party invite code, with guests shown waiting to join, overlaid on a photo of a living room',
                width: 2344,
                height: 1656,
              },
            ],
          },
        ],
      },
      {
        no: '',
        label: 'Testing',
        head: 'Does the party flow make sense?',
        body: [
          'I tested the core journey from creating a watch party to getting friends into the room. The goal was simple: could someone understand what to do without needing instructions?',
          'This helped me identify where the experience needed clearer cues, particularly around choosing a movie, inviting friends, and knowing when everyone was ready to start.',
        ],
        blocks: [
          {
            // Mobile screen recording, shown with the same phone-mockup +
            // background-frame treatment as Azza's video chapters.
            video: { src: '/images/syncwatch/testing1.mov' },
          },
          {
            head: 'Does it still feel like watching together?',
            body: [
              'The second part was less about completing tasks and more about the feeling of the experience. I looked at how chat, reactions, the lobby, and synchronized playback could support the social side of watching without becoming distractions.',
              'The challenge was finding the right balance between watching the movie and being present with everyone else. The interface needed to stay quiet when the movie was playing, while still giving the group ways to react and connect.',
            ],
          },
          {
            video: { src: '/images/syncwatch/testing2.mov' },
          },
        ],
      },
      {
        no: '',
        label: 'Outcome',
        head: 'Making distance feel a little smaller',
        body: [
          'SyncWatch became an exploration of what a remote movie night could feel like when the experience is designed to make it easy for people to share moments with their loved ones.',
          'I brought synchronized playback, chat, and shared session summaries into one experience, making remote movie nights feel less complicated while preserving the social moments that make watching together feel like watching together.',
        ],
        parts: [
          {
            type: 'gallery',
            layout: 'column',
            crop: false,
            images: [
              {
                src: '/images/Syncwatch 2 Image.png',
                alt: 'SyncWatch onboarding screens for signing in and selecting a streaming service, alongside two user quotes about wanting to watch movies together virtually',
                width: 7200,
                height: 3060,
              },
            ],
          },
        ],
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
      return `${c.head ?? ''} ${bodyText(c.body)} ${c.quote ?? ''} ${blockText} ${partText}`
    })
    .join(' ')
    .trim()
    .split(/\s+/).length
  return `${Math.max(2, Math.round(words / 200))} min read`
}
