'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const NATIVE_W = 408
const NATIVE_H = 834

export function AzzaMockup() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(wrapRef.current.offsetHeight / NATIVE_H)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: '77vh', maxHeight: NATIVE_H, aspectRatio: `${NATIVE_W}/${NATIVE_H}` }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: NATIVE_W,
          height: NATIVE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        <PhoneFrame />
      </div>
    </div>
  )
}

function PhoneFrame() {
  return (
    <div
      style={{
        position: 'relative',
        width: NATIVE_W,
        height: NATIVE_H,
        backgroundColor: '#3430e9',
        border: '13px solid black',
        borderRadius: 77,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* App header — logo + wordmark, centered as a unit.
          The container is the width of the logo group (124px), centered with left-1/2 + translateX.
          The wordmark is offset by (152 - 129) = 23px within this container, matching Figma exactly. */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 124,
          height: 56,
        }}
      >
        <img
          src="/azza/logo-group.svg"
          alt=""
          style={{ position: 'absolute', left: 0, top: 13, width: 124, height: 41.77 }}
        />
        <img
          src="/azza/azza-wordmark.svg"
          alt=""
          style={{ position: 'absolute', left: 9.641, top: 19.51, width: 104.718, height: 26.094 }}
        />
      </div>

      {/* Off-ramp receipt card */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 176,
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          borderRadius: 40,
          padding: '40px 20px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            alignItems: 'center',
            width: 350,
          }}
        >
          {/* Receipt logo */}
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <img src="/azza/receipt-logo.svg" alt="" style={{ width: 100, height: 33.686 }} />
            <img
              src="/azza/receipt-wordmark.svg"
              alt=""
              style={{
                position: 'absolute',
                top: 5.25,
                left: 3.36,
                width: 84.449,
                height: 21.044,
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%' }}>
            {/* Title + flag */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: '#50af95',
                  borderRadius: 292,
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/azza/nigeria-flag.svg"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 24.708,
                    height: 24,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'Subjectivity, sans-serif',
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: '24px',
                  color: '#3430e9',
                  letterSpacing: -1.44,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  width: 247,
                  margin: 0,
                }}
              >
                ngn withdrawal
              </p>
            </div>

            {/* Blue banner */}
            <div
              style={{
                backgroundColor: '#3430e9',
                borderRadius: 16,
                overflow: 'hidden',
                width: '100%',
                position: 'relative',
                height: 130,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                }}
              >
                <Image src="/azza/asset3-bg.png" alt="" fill sizes="350px" className="object-cover" />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  alignItems: 'center',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: '28px',
                    letterSpacing: -1.2,
                    margin: 0,
                  }}
                >
                  You withdrew:
                </p>
                <p
                  style={{
                    fontFamily: 'Subjectivity, sans-serif',
                    fontWeight: 800,
                    fontSize: 32,
                    lineHeight: '40px',
                    letterSpacing: -1.92,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    margin: 0,
                  }}
                >
                  NGN 475,000
                </p>
              </div>
            </div>
          </div>

          {/* Transaction summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <p
              style={{
                fontFamily: 'Subjectivity, sans-serif',
                fontWeight: 800,
                fontSize: 12,
                lineHeight: '24px',
                letterSpacing: -0.72,
                textTransform: 'uppercase',
                color: '#0e231c',
                margin: 0,
              }}
            >
              Transaction Summary
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <TxRow label="Amount (in crypto):" value="300 USDT" />
              <TxRow label="Transaction Fee:" value="0.08 USDT" />

              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: '24px',
                    letterSpacing: -0.56,
                    color: '#1e1e1e',
                    margin: 0,
                  }}
                >
                  Receiver&apos;s Details
                </p>
                <LabelValue label="Bank Name:" value="Zenith Bank" />
                <LabelValue label="Account Name:" value="Toochukwu Okoro" />
                <LabelValue label="Account Number:" value="2061920288" />
              </div>

              <Divider />

              {/* Date row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <p style={{ ...bodyStyle, margin: 0, whiteSpace: 'nowrap' }}>Date:</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <p style={{ ...semiboldStyle, margin: 0, whiteSpace: 'nowrap' }}>08/11/2024</p>
                  <img src="/azza/dot.svg" alt="" style={{ width: 6, height: 6 }} />
                  <p style={{ ...semiboldStyle, margin: 0, whiteSpace: 'nowrap' }}>10:11 AM</p>
                </div>
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'Subjectivity, sans-serif',
              fontWeight: 800,
              fontSize: 12,
              lineHeight: '24px',
              letterSpacing: -0.72,
              color: '#3430e9',
              textTransform: 'uppercase',
              textAlign: 'center',
              width: '100%',
              margin: 0,
            }}
          >
            Thank you for choosing azza!
          </p>
        </div>
      </div>
    </div>
  )
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  letterSpacing: -0.56,
  color: '#292929',
}

const semiboldStyle: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '20px',
  letterSpacing: -0.56,
  color: '#1e1e1e',
}

function TxRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <p style={{ ...bodyStyle, margin: 0, whiteSpace: 'nowrap' }}>{label}</p>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <img src="/azza/usdt-icon.svg" alt="" style={{ width: 20, height: 20 }} />
        <p style={{ ...semiboldStyle, margin: 0, whiteSpace: 'nowrap' }}>{value}</p>
      </div>
    </div>
  )
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <p style={{ ...bodyStyle, margin: 0, whiteSpace: 'nowrap' }}>{label}</p>
      <p style={{ ...semiboldStyle, margin: 0, textAlign: 'right' }}>{value}</p>
    </div>
  )
}

function Divider() {
  return (
    <div style={{ position: 'relative', height: 1, width: '100%' }}>
      <img src="/azza/divider.svg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
    </div>
  )
}
