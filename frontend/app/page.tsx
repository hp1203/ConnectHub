import Features from "@/components/Features";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <Header/>
    <main className="flex min-h-screen flex-col font-montserrat">
      <Hero/>
      <Features/>
      <Pricing/>
    </main>
    <Footer/>
    </div>
  )
}
