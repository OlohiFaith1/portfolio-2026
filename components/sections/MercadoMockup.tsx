'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

const NATIVE_W = 408
const NATIVE_H = 834

interface Props {
  /** Tailwind height class(es), e.g. "h-[50vh] md:h-[60vh] lg:h-[77vh]" */
  className?: string
}

export function MercadoMockup({ className = 'h-[77vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <PhoneFrame />
    </PhoneMockupScale>
  )
}

const dmSans: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" }

function PhoneFrame() {
  return (
    <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
      {/* Physical phone bezel — shadow + frame photo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
        <Image src="/mercado/iphone-shadow.png" alt="" fill sizes={`${NATIVE_W}px`} className="object-cover pointer-events-none" />
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src="/mercado/iphone-frame.png" alt="" fill sizes={`${NATIVE_W}px`} className="object-cover pointer-events-none" />
      </div>

      {/* Screen */}
      <div
        style={{
          position: 'absolute',
          left: 21,
          top: 19.5,
          width: 366,
          height: 792,
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 366, height: 41, backgroundColor: 'white' }}>
          <div
            style={{
              position: 'absolute',
              left: 9,
              top: 12,
              width: 70,
              ...dmSans,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: -0.17,
              color: 'black',
              textAlign: 'center',
            }}
          >
            09:41
          </div>
          <img
            src="/mercado/status-icons.svg"
            alt=""
            style={{ position: 'absolute', right: 12, top: 15, width: 62, height: 11 }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            left: 23,
            top: 64,
            width: 321,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <img src="/mercado/header-icon-left.svg" alt="" style={{ width: 34, height: 34 }} />
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 19, letterSpacing: -0.38, color: '#262626', margin: 0 }}>
                Withdrawals
              </p>
            </div>
            <img src="/mercado/header-icon-right.svg" alt="" style={{ width: 34, height: 34 }} />
          </div>

          {/* Balance */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 19 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <p style={{ ...dmSans, fontWeight: 500, fontSize: 11, letterSpacing: -0.23, color: '#737373', margin: 0 }}>
                  Total Balance
                </p>
                <img src="/mercado/eye.svg" alt="" style={{ width: 17, height: 17 }} />
              </div>
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 38, letterSpacing: -0.75, color: '#262626', margin: 0 }}>
                $8,100.57
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#eff3f4',
                border: '1px solid #e5e5e5',
                borderRadius: 9,
                padding: '8px 11px',
              }}
            >
              <img src="/mercado/money-send-bold.svg" alt="" style={{ width: 15, height: 15 }} />
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 13, letterSpacing: -0.26, color: '#14474b', margin: 0 }}>
                Withdraw
              </p>
            </div>
          </div>

          {/* Search + list */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 19, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid #e5e5e5',
                borderRadius: 11,
                padding: 11,
                width: '100%',
              }}
            >
              <img src="/mercado/search.svg" alt="" style={{ width: 19, height: 19 }} />
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 13, letterSpacing: -0.26, color: '#737373', margin: 0, whiteSpace: 'nowrap' }}>
                Search by transaction ID, date
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 15, width: '100%' }}>
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 13, letterSpacing: -0.26, color: '#262626', margin: 0 }}>
                All Withdrawals
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 19, width: '100%' }}>
                {transactions.map((tx, i) => (
                  <TxRow key={i} {...tx} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: 366,
            height: 75,
            backgroundColor: '#fafafa',
            borderTop: '1px solid #f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 38,
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <img src={item.icon} alt="" style={{ width: 19, height: 19 }} />
              <p
                style={{
                  ...dmSans,
                  fontWeight: 500,
                  fontSize: 9,
                  letterSpacing: -0.19,
                  color: item.active ? '#092b2d' : '#a3a3a3',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Modal backdrop — part of the design's "account added" state */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />

        {/* Bottom-sheet modal */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: 366,
            backgroundColor: 'white',
            borderRadius: 19,
            padding: '30px 23px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 19,
          }}
        >
          <img src="/mercado/close-x.svg" alt="" style={{ width: 19, height: 19 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: '100%' }}>
            <img src="/mercado/check-circle.svg" alt="" style={{ width: 75, height: 75 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 23, width: '100%' }}>
              <p style={{ ...dmSans, fontSize: 15, letterSpacing: -0.3, color: '#404040', textAlign: 'center', margin: 0, width: '100%' }}>
                You&apos;ve successfully added a bank account:
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f7f9f9',
                  border: '1px solid #eff3f4',
                  borderRadius: 8,
                  padding: 9,
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ position: 'relative', width: 23, height: 23, borderRadius: '50%', overflow: 'hidden' }}>
                      <Image src="/mercado/avatar.png" alt="" fill sizes="23px" className="object-cover" />
                    </div>
                    <p style={{ ...dmSans, fontWeight: 500, fontSize: 15, letterSpacing: -0.3, color: '#262626', margin: 0, whiteSpace: 'nowrap' }}>
                      Orji Desmond
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ ...dmSans, fontSize: 13, letterSpacing: -0.26, color: '#404040', margin: 0, whiteSpace: 'nowrap' }}>
                      0697333512
                    </p>
                    <img src="/mercado/dot.svg" alt="" style={{ width: 6, height: 6 }} />
                    <p style={{ ...dmSans, fontSize: 13, letterSpacing: -0.26, color: '#404040', margin: 0, whiteSpace: 'nowrap' }}>
                      Guaranty Trust Bank
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#092b2d',
                    borderRadius: 10,
                    padding: '8px 11px',
                    width: '100%',
                  }}
                >
                  <p style={{ ...dmSans, fontSize: 15, letterSpacing: -0.3, color: 'white', margin: 0, whiteSpace: 'nowrap' }}>
                    Continue with Withdrawal
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: 10,
                    padding: '8px 11px',
                    width: '100%',
                  }}
                >
                  <p style={{ ...dmSans, fontSize: 15, letterSpacing: -0.3, color: '#262626', margin: 0, whiteSpace: 'nowrap' }}>
                    Back to Home
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const statusStyles: Record<string, { bg: string; border: string; text: string }> = {
  Completed: { bg: 'rgba(211,246,228,0.5)', border: '#70e2a0', text: '#00a14b' },
  Pending: { bg: 'rgba(255,244,204,0.5)', border: '#ffd966', text: '#e6a800' },
  Failed: { bg: 'rgba(248,215,218,0.5)', border: '#f4a3a6', text: '#d83037' },
}

interface Transaction {
  icon: string
  date: string
  time: string
  crypto: string
  amount: string
  chain: string
  status: 'Completed' | 'Pending' | 'Failed'
}

const transactions: Transaction[] = [
  { icon: '/mercado/money-send-linear.svg', date: '3rd Mar, 2025', time: '11:00PM', crypto: '/mercado/usdc.svg', amount: '25 USDC', chain: 'BASE', status: 'Completed' },
  { icon: '/mercado/money-send-linear.svg', date: '3rd Mar, 2025', time: '11:00PM', crypto: '/mercado/usdc.svg', amount: '100 USDC', chain: 'ETH', status: 'Pending' },
  { icon: '/mercado/money-send-linear.svg', date: '3rd Mar, 2025', time: '11:00PM', crypto: '/mercado/usdt.svg', amount: '7.5 USDT', chain: 'POLYGON', status: 'Failed' },
  { icon: '/mercado/money-send-linear.svg', date: '3rd Mar, 2025', time: '11:00PM', crypto: '/mercado/usdc.svg', amount: '100 USDC', chain: 'BASE', status: 'Completed' },
  { icon: '/mercado/refresh-linear.svg', date: '3rd Mar, 2025', time: '11:00PM', crypto: '/mercado/usdc.svg', amount: '100 USDC', chain: 'BASE', status: 'Failed' },
  { icon: '/mercado/money-recive-linear.svg', date: '3-29-2025', time: '11:00PM', crypto: '/mercado/usdc.svg', amount: '100 USDC', chain: 'BASE', status: 'Completed' },
]

function TxRow({ icon, date, time, crypto, amount, chain, status }: Transaction) {
  const colors = statusStyles[status]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f9fafc',
        border: '1px solid #f5f5f5',
        borderRadius: 11,
        padding: '11px 15px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ position: 'relative', width: 30, height: 30, flexShrink: 0 }}>
            <img src="/mercado/tx-icon-bg.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <img src={icon} alt="" style={{ position: 'absolute', left: 6, top: 6, width: 19, height: 19 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ ...dmSans, fontWeight: 500, fontSize: 13, letterSpacing: -0.26, color: '#262626', margin: 0, whiteSpace: 'nowrap' }}>
              Mer-SO25XT
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 9, letterSpacing: -0.19, color: '#a3a3a3', margin: 0, whiteSpace: 'nowrap' }}>
                {date}
              </p>
              <img src="/mercado/dot.svg" alt="" style={{ width: 6, height: 6 }} />
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 9, letterSpacing: -0.19, color: '#a3a3a3', margin: 0, whiteSpace: 'nowrap' }}>
                {time}
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <img src={crypto} alt="" style={{ width: 13, height: 13 }} />
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 11, letterSpacing: -0.23, color: '#292929', margin: 0, whiteSpace: 'nowrap' }}>
                {amount}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: '1px solid #d4d4d4',
                borderRadius: 30,
                padding: '2px 6px',
              }}
            >
              <p style={{ ...dmSans, fontWeight: 500, fontSize: 8, letterSpacing: -0.15, color: '#737373', margin: 0, whiteSpace: 'nowrap' }}>
                {chain}
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
              padding: '3px 6px',
            }}
          >
            <p style={{ ...dmSans, fontWeight: 500, fontSize: 9, letterSpacing: -0.19, color: colors.text, margin: 0, whiteSpace: 'nowrap' }}>
              {status}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const navItems = [
  { icon: '/mercado/house.svg', label: 'Home', active: false },
  { icon: '/mercado/money-recive-linear.svg', label: 'Collections', active: false },
  { icon: '/mercado/refresh-linear.svg', label: 'Refunds', active: false },
  { icon: '/mercado/money-send-bold.svg', label: 'Withdrawals', active: true },
]
