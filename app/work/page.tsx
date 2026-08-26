import { redirect } from 'next/navigation'

// /work no longer renders its own separate homepage-like page — its
// content (project grid + Experiments) now lives on the homepage itself.
export default function WorkPage() {
  redirect('/')
}
