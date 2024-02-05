import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import post1 from '@/data/blog/en/1-why-am-i-doing-this';
import post1RU from '@/data/blog/ru/1-why-am-i-doing-this';
import post2 from '@/data/blog/en/2-google-sheets-tutorial';
import post2RU from '@/data/blog/ru/2-google-sheets-tutorial';
import styles from './Blog.module.css'

export const enPosts = [
  post2,
  post1,
];

export const ruPosts = [
  post2RU,
  post1RU,
];

export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context

  const posts = locale === "en" ? enPosts : ruPosts;

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

// structuring data like a pro, leading social media like a lame cave person.

export default function Blog({ posts }: { posts: any[] }) {
  const { t } = useTranslation();
  const [ selectedCategory, setSelectedCategory ] = useState<string>('all');

  const categories = [
    { value: 'all', title: t("blog.category.all") },
    { value: 'startups', title: t("blog.category.startups") },
    { value: 'dev', title: t("blog.category.dev") },
    // { value: 'immigration', title: 'Immigration'},
    { value: 'lifeStuff', title: t("blog.category.life") },
    { value: 'projects', title: t("blog.category.projects") },
    { value: 'other', title: t("blog.category.other") },
  ];

  const filteredPosts = selectedCategory !== 'all'
    ? posts.filter(post => post.postPreview.type === selectedCategory)
    : posts;

  const numberOfPostsInEachCategory = categories.map(category => {
    const postsInCategory = posts.filter(post => post.postPreview.type === category.value);
    return { category: category.value, count: postsInCategory.length };
  })

  const EntryCard = ({ post }: any) => (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={post.postPreview.cover} fill alt={`Post cover: ${post.postPreview.title}`} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <div className={styles.cardDate}>{post.postPreview.date}</div>
          {/* <div className={styles.infoDivider}>|</div>
          <div className={styles.cardAuthor}>Karina Kupp</div> */}
        </div>
        <h2 className={styles.cardTitle}>{post.postPreview.titleDiv || post.postPreview.title}</h2>
      </div>
    </article>
  )

  return (
    <>
      <SEO
        title="Blog - Karina Kupp"
        description="Notes on startups, software engineering, immigrations, and life stuff. Trying to beat my impostor syndrom and share the things I've learned."
        image="/karina-kupp.jpg"
        url="https://karinakupp.com/blog"
      />

      <Navbar />

      <main className={styles.main}>
        <section className={styles.header}>
          <h1>{t("blog.title")}</h1>
          <p>{t("blog.subtitle")}</p>
        </section>

        <div className={styles.categorySwitch}>
          {categories.map((category, i) => (
            <div
              key={i}
              className={selectedCategory === category.value ? `${styles.category} ${styles.categorySelected}` : styles.category}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.title}
              <span>// {category.value === "all" ? posts.length : numberOfPostsInEachCategory.find(c => c.category === category.value)?.count || 0}</span>
            </div>
          ))}
        </div>

        <div className={styles.cards}>
          {filteredPosts.map(post => (
            post.postPreview.slug.includes("https") ? (
              <a href={post.postPreview.slug} key={post.postPreview.slug} aria-label={post.postPreview.title} target="_blank">
                <EntryCard post={post} />
              </a>
            ) : (
              <Link href={`/blog/${post.postPreview.slug}`} key={post.postPreview.slug} aria-label={post.postPreview.title}>
                <EntryCard post={post} />
              </Link>
            )
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}