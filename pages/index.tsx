import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

// structuring data like a pro, leading social media like a lame cave person.

export default function Home() {
  return (
    <>
      <SEO
        title="Karina Kupp"
        description="Writer, musician, web developer, creator of Chill Subs. Pro at structuring data, creating demos and being cute awkward. Absolutely can't handle social media."
        image="/karina-kupp.jpg"
        url="https://karinakupp.com"
      />

      <Navbar />

      <main className={styles.main}>
        <section className={styles.header}>
          <div className={styles.image}>
            <Image src="/karinakupp.jpeg" alt="Karina Kupp" fill />
          </div>
          <div className={styles.info}>
            <h1>Hi! I'm Karina. I build <a href="https://chillsubs.com/" target="_blank">Chill Subs</a>, <a href="https://open.spotify.com/artist/26gsov9eryBnS3qdUTsoWK?si=MYOTxnotTUKcwk9pJ7599A" target="_blank">write sad songs</a> and constantly brainstorm ideas <br/>I don't really have time for.</h1>
            {/* <p className={styles.description}>Welcome to this fascinating aggregator of all my attempts not to waste my life.</p> */}
            <p className={styles.description}>I'm a software engineer with 6 years of experience. I spent 3 years building mostly MVPs for startups at an outsourcing company, then left and did some freelance (like making a medical tourism platform...during a global pandemic), and in 2022, launched <a href="https://chillsubs.com/" target="_blank">Chill Subs</a> - a website helping writers get published that now has almost 20,000 registered users and is reimagining the writing industry every day.</p>
            <p className={styles.description}>Now I'm trying to beat my impostor syndrom and share the things I've learned in my blog.</p>
            <p className={styles.smallText}>// Sometimes, I look out the window and think that wasting one's life is impossible. It's here after all, it's yours, you're living it! Other times, I go on Twitter and every single person seems to be doing more than me. Then I get up and create a personal website. Then I think it's all stupid. //</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
