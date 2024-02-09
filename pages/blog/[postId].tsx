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

  const posts = [...enPosts, ...ruPosts];
  const paths = posts.map((post) => {
    return [
      { params: { postId: post.postPreview.slug }, locale: 'en' },
      { params: { postId: post.postPreview.slug }, locale: 'ru' },
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
        description={post.meta.previewText}
        image={post.meta.metaImage}
        url={`https://www.karinakupp.com/blog/${post.meta.slug}`}
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