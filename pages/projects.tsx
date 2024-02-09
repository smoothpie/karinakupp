import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import styles from '@/styles/Projects.module.css'

const inter = Inter({ subsets: ['latin'] })

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

export default function Projects() {
  const [ mode, setMode ] = useState<string>('own');

  return (
    <>
      <SEO
        title="Karina Kupp"
        description="Things I worked on, both for my own projects and for hire. A platform for creatives, a medical tourism startup, a playlists pitching platform, a recuiting system, and more."
        image="/karina-kupp.jpg"
        url="https://karinakupp.com/projects"
      />

      <Navbar />

      <main className={styles.main}>
        {mode === 'own' && (
          <div className={mode ? styles.projects : styles.projectsHidden}>
            <a href="https://www.chillsubs.com">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2022 - now] Chill Subs (I made a thing for writers. Now it has 10.000 users)</h3>
              </div>
            </a>

            <a href="https://teal.tools">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2022 - now] An IT services company. Full grown up mode. I HAVE A PRINTER.</h3>
              </div>
            </a>

            <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2021] Patronlinks (a failed attempt to create an Etsy-like website. Lesson: you need to provide value before asking people to do something)</h3>
            </div>

            <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2018] Devshop. LOL</h3>
            </div>

            <a href="https://www.youtube.com/playlist?list=PLI20UtJ8jOmQ_0wSev4rxgUQxQympR5qg">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2016 - 2017] Open Up Challenge (an interview series where I talked to people at my university)</h3>
              </div>
            </a>

            <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2016] Dreamimi (a super cute productivity blog I started with my university friend. couldn't handle it, but it was fun)</h3>
            </div>

            <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2015] Your Lighter (a VK page I started to make people post about what inspires them. Got my friends to post, smiled quite a few times, then abandoned)</h3>
            </div>

            <a href="https://vk.com/threedaysgrace_eefc">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2015] Managing a 100.000 members Three Days Grace VK community with my friends. That's how we all became friends, through TDG. Read it, it's a beautiful story.</h3>
              </div>
            </a>

            {/* <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2014] Translating Papa Roach interviews to Russian for a VK community</h3>
            </div> */}
          </div>
        )}
        {mode === 'hire' && (
          <div className={mode ? styles.projects : styles.projectsHidden}>
            <a href="https://dailyplaylists.com/">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2023] Daily Playlists (playlists pitching platform. React, Gatsby, Node.js, GraphQL, MySQL, Spotify API. Worked on some of the features.)</h3>
              </div>
            </a>

            <div className={styles.project}>
              <div className={styles.img} />
              <h3>[2019-2020] Heal-C (a medical tourism and telehealth platform. React, Gatsby, Node.js, MongoDB, Socket.io, Vonage. developed from scratch)</h3>
            </div>

            <a href="https://noviopus.com/">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2018-2020, 2021-2022] Noviopus (a recruitement management system. React, Node.js, MongoDB, Neo4j). Worked on the candidates matching system, an internal admin panel, Career app and smaller day-to-day tasks)</h3>
              </div>
            </a>

            <a href="https://dashbouquet.com/">
              <div className={styles.project}>
                <div className={styles.img} />
                <h3>[2018-2020] Software developer at Dashbouquet. Created stuff like advertising tools for a TV network, micro-influencer apps, cargo management, etc.</h3>
              </div>
            </a>
          </div>
        )}
        {!mode && <div className={styles.projectsHidden} />}

        <div className={styles.header}>
          <h1>Stuff I built</h1>

          <div className={styles.switch}>
            <div className={mode === 'own' ? `${styles.switchOption} ${styles.active}` : styles.switchOption} onClick={() => setMode('own')}>For myself</div>
            <div className={mode === 'hire' ? `${styles.switchOption} ${styles.active}` : styles.switchOption} onClick={() => setMode('hire')}>For hire</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
