import fs from 'fs'
import path from 'path'
import { MercadoStudy5Client } from './MercadoStudy5Client'

// Server component: checks which of this section's expected mockup
// exports actually exist on disk yet, so the (client) component below can
// render a clean, correctly-sized empty card instead of a broken <img>
// for anything still missing. A 'use client' module can't use `fs`
// directly, hence the split — MercadoStudy5Client.tsx has the section's
// actual layout/animation and is otherwise unchanged.
//
// This list mirrors the `src` values in MercadoStudy5Client.tsx's CARDS
// map exactly — see that file's own trailing comment for the full
// Figma-node-to-filename mapping. Keep the two in sync if a filename ever
// changes.
const ASSET_FILENAMES = [
  'mercado-system-add-cashier-code.png',
  'mercado-system-refund-success.png',
  'mercado-system-withdrawal-method 1.png',
  'mercado-system-add-cashier-input.png',
  'mercado-system-bank-withdrawal-success.png',
  'mercado-system-collection-details.png',
  'mercado-system-withdraw-crypto.png',
  'mercado-system-wallet-withdrawal-success.png',
  'mercado-system-withdrawal-method 2.png',
  'mercado-system-refund-details.png',
]

export function MercadoStudy5() {
  const existingAssetSrcs = ASSET_FILENAMES.filter((filename) =>
    fs.existsSync(path.join(process.cwd(), 'public', 'images', 'mercado', filename))
  ).map((filename) => `/images/mercado/${filename}`)

  return <MercadoStudy5Client existingAssetSrcs={existingAssetSrcs} />
}
