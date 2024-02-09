import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import generateRssFeed from '@/utils/generateRSSFeed'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin', ] })

// structuring data like a pro, leading social media like a lame cave person.

export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context

  await generateRssFeed();

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default function Home() {
  const { t } = useTranslation()

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
            <h1 dangerouslySetInnerHTML={{ __html: t("home.title")}} />
            {/* <p className={styles.description}>Welcome to this fascinating aggregator of all my attempts not to waste my life.</p> */}
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: t("home.subtitle.part1")}} />
            <p className={styles.description}>{t("home.subtitle.part2")}</p>
            <p className={styles.smallText}>{t("home.smallText")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
