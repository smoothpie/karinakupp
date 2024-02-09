import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { format } from 'date-fns'
import { RxExternalLink } from "react-icons/rx";
import { getAllPosts, PostMeta } from "@/lib/blog";
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

  const posts = getAllPosts(locale);

  // const posts = locale === "en" ? enPosts : ruPosts;

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
    { value: 'life', title: t("blog.category.life") },
    // { value: 'projects', title: t("blog.category.projects") },
    // { value: 'other', title: t("blog.category.other") },
  ];

  const filteredPosts = selectedCategory !== 'all'
    ? posts.filter(post => post.meta.type === selectedCategory)
    : posts;

  const numberOfPostsInEachCategory = categories.map(category => {
    const postsInCategory = posts.filter(post => post.meta.type === category.value);
    return { category: category.value, count: postsInCategory.length };
  })

  const EntryCard = ({ post, isExternal }: any) => (
    <article className={styles.card}>
      {/* <div className={styles.cardImage}>
        <Image src={post.meta?.cover} fill alt={`Post cover: ${post.meta.title}`} />
      </div> */}
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          {/* <div className={styles.infoDivider}>|</div>
          <div className={styles.cardAuthor}>Karina Kupp</div> */}
        </div>
        <h2 className={styles.cardTitle}>
          {post.meta.titleDiv || post.meta.title}{' '}
          {isExternal && <RxExternalLink />}
        </h2>
        <p>{post.meta.excerpt}</p>
        <div className={styles.cardDate}>{format(post.meta.date, "MMM dd, yyyy")}</div>
        {/* <p className={styles.type}># {categories.find(c => c.value === post.meta.type)?.title}</p> */}
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
            post.meta.link?.includes("https") ? (
              <a href={post.meta.link} key={post.meta.link} aria-label={post.meta.title} target="_blank">
                <EntryCard post={post} isExternal />
              </a>
            ) : (
              <Link href={`/blog/${post.meta.link}`} key={post.meta.link} aria-label={post.meta.title}>
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