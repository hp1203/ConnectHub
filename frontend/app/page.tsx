import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-montserrat">
      <Hero/>
      <Features/>
    </main>
  )
}
