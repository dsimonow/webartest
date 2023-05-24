import { LayoutXR } from '@/components/dom/Layout'
import '@/global.css'

export const metadata = {
  title: 'Next.js + XR',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function ArLayout({children}) {
  return (
    <LayoutXR>{children}</LayoutXR>
  )
}


