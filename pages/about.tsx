import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import styles from '@/styles/About.module.css'

const inter = Inter({ subsets: ['latin'] })

// structuring data like a pro, leading social media like a lame cave person.

export default function About() {
  return (
    <>
      <SEO
        title="Karina Kupp"
        description="Hello! I'm Karina. I write sad songs and build Chill Subs."
        image="/karina-kupp.jpg"
        url="https://karinakupp.com/about"
      />

      <Navbar />

      <main className={styles.main}>
        <section className={styles.header}>
          <h1>Helllooooo, can't wait to make this about me</h1>
          <p className={styles.description}>I'm Karina. I write sad songs and build Chill Subs.</p>
          <p className={styles.smallText}>You can typically find me creating yet another Spotify playlist, buying tickets to the other side of the world to see Carissa's Wierd reunion, or being angry I can't clone myself to work on 248582 ideas at the same time. Nice to meet you! Please be my friend and make me go outside.</p>
        </section>
      </main>

      <Footer />
    </>
  )
}
