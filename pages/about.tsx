import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import styles from '@/styles/About.module.css'

export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

// structuring data like a pro, leading social media like a lame cave person.

export default function About() {
  const { t } = useTranslation()

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
          <h1>{t("about.title")}</h1>
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: t("about.subtitle") }} />
          <p className={styles.smallText}>{t("about.bio")}</p>
        </section>
      </main>

      <Footer />
    </>
  )
}
