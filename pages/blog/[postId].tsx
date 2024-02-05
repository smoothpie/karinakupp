import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { enPosts, ruPosts } from '.';
import Link from '@/components/Link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import styles from './Post.module.css'

type PostPreview = {
  slug: string,
  date: string,
  author: string,
  metaImage: string,
  cover: string,
  title: string,
  titleDiv?: any,
  previewText: string,
  blurb?: any,
  links?: any[],
  type: string;
}

type PostInfo = {
  content: any,
  postPreview: PostPreview,
}

export async function getStaticProps(props: any) {
  const postId = props.params!.postId as string;
  const { locale } = props;

  return {
    props: {
      postId: postId,
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 180
  }
}

export async function getStaticPaths() {
  const posts = [...enPosts, ...ruPosts];
  const paths = posts.map((post) => {
    return [
      { params: { postId: post.postPreview.slug }, locale: 'en' },
      { params: { postId: post.postPreview.slug }, locale: 'ru' },
    ]
  }).flat();

  return { paths, fallback: false }
}

export default function Post(props : any) {
  const router = useRouter();
  const { postId } = props;
  const { locale } = router;
  const posts = locale === "en" ? enPosts : ruPosts;
  const currentPost: any = posts.find(p => p.postPreview.slug === postId);

  // let disqusConfig: any = {
  //   url: `${clientOrigin}/blog/${postId}`,
  //   identifier: postId, // Single post id
  //   title: currentPost?.postPreview?.title // Single post title
  // }
  // const disqusShortname = 'chillsubs';

  if (!currentPost) return null;

  return (
    <div className={styles.container}>
      <SEO
        title={currentPost.postPreview.title}
        description={currentPost.postPreview.previewText}
        image={currentPost.postPreview.metaImage}
        url={`https://www.karinakupp.com/blog/${postId}`}
      />

      <Navbar />

      <main className={styles.main}>
        <div className={styles.post}>
          <header>
            <div className={styles.postDate}>
              {currentPost.postPreview.date}
            </div>
            <h1 className={styles.postTitle}>{currentPost.postPreview.titleDiv || currentPost.postPreview.title}</h1>
            <div className={styles.cover}>
              <Image src={currentPost.postPreview.cover} fill alt={`Cover of ${currentPost.postPreview.title}`} />
            </div>
          </header>
          <article className={styles.contentAndBio}>
            <div className={styles.content}>
              {currentPost.postPreview.blurb && (
                <div className={styles.blurb}>{currentPost.postPreview.blurb}</div>
              )}
              {currentPost.content}
            </div>
          </article>
          {/* <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          /> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}