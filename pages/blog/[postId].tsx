import * as React from 'react'
import type { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { format } from 'date-fns'
import { getPostFromSlug, getSlugs, PostMeta } from "@/lib/blog";
import { enPosts, ruPosts } from '.';
import "highlight.js/styles/atom-one-dark.css";
import Link from '@/components/Link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import s from './Post.module.css'

interface MDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const { postId } = context.params as { postId: string };
  const { content, meta } = getPostFromSlug(postId, locale);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight as any,
      ],
    },
  });

  return {
    props: {
      post: { source: mdxSource, meta },
      ...(await serverSideTranslations(locale)),
    }
  };
}

export const getStaticPaths: GetStaticPaths = async (context: any) => {
  // const { locale } = context;
  // const enPosts = getSlugs("en").map((slug) => ({ params: { slug } }));
  // const ruPosts = getSlugs("ru").map((slug) => ({ params: { slug } }));
  // const paths = [...enPosts, ...ruPosts];

  const enPosts = (await getSlugs("en")).map((slug) => ({ params: { slug } }))
  const ruPosts = (await getSlugs("ru")).map((slug) => ({ params: { slug } }))

  const posts = [...enPosts, ...ruPosts];
  const paths = posts.map((post) => {
    return [
      { params: { postId: post.params.slug }, locale: 'en' },
      { params: { postId: post.params.slug }, locale: 'ru' },
    ]
  }).flat();

  return { paths, fallback: false }

  // return {
  //   paths,
  //   fallback: false,
  // };
};

function Post({ post }: { post: MDXPost }) {
  console.log(post.meta)
  return (
    <div className={s.container}>
      <SEO
        title={post.meta.title}
        description={post.meta.excerpt}
        image={post.meta.metaImage}
        url={post.meta.link.includes("http") ? post.meta.link : `https://www.karinakupp.com/blog/${post.meta.link}`}
      />

      <Navbar />

      <main className={s.main}>
        <div className={s.post}>
          <header>
            <h1 className={s.postTitle}>{post.meta.title}</h1>
            <div className={s.postDate}>
              {format(post.meta.date, "MMMM dd, yyyy")}
            </div>
            {/* <div className={s.cover}>
              <Image src={post.meta.cover} fill alt={`Cover of ${post.meta.title}`} />
            </div> */}
          </header>
          <article className={s.content}>
            <MDXRemote {...post.source} components={{ Image }} />
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

export default Post