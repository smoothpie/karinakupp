import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import post1 from '@/data/blog/1-why-am-i-doing-this';
import post2 from '@/data/blog/2-google-sheets-tutorial';
import styles from './Blog.module.css'

const categories = [
  { value: 'all', title: 'All'},
  { value: 'startups', title: 'Startups'},
  { value: 'dev', title: 'Dev'},
  // { value: 'immigration', title: 'Immigration'},
  { value: 'lifeStuff', title: 'Life stuff'},
  { value: 'projects', title: 'My old projects'},
  { value: 'other', title: 'Other'},
];

export const posts = [
  post2,
  post1,
];

// structuring data like a pro, leading social media like a lame cave person.

export default function Blog() {
  const [ selectedCategory, setSelectedCategory ] = useState<string>('all');

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
          <h1>Blog (aka brain dump, sometimes useful)</h1>
          <p>Notes on building startups, software engineering, immigration, and life stuff.</p>
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