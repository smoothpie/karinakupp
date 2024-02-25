import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

// const POSTS_PATH = path.join(process.cwd(), "data");

// export const enPosts = [
//   post2,
//   post1,
// ];

// export const ruPosts = [
//   post2RU,
//   post1RU,
// ];

export const getSlugs = (locale: string): string[] => {
  console.log(locale)
  const POSTS_PATH = path.join(process.cwd(), `data/blog/${locale}`);
  console.log(POSTS_PATH)
  const paths = sync(`${POSTS_PATH}/*.mdx`);

  return paths.map((path: string) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
};

export const getAllPosts = (locale: string) => {
  const posts = getSlugs(locale)
    .map((slug) => getPostFromSlug(slug, locale))
    .sort((a, b) => {
      if (new Date(a.meta.date) > new Date(b.meta.date)) return 1;
      if (new Date(a.meta.date) < new Date(b.meta.date)) return -1;
      return 0;
    })
    .reverse();
  return posts;
};

interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  excerpt: string;
  link: string;
  title: string;
  tags: string[];
  date: string;
  cover: string;
  metaImage: string;
  type: string;
}

export const getPostFromSlug = (slug: string, locale: string): Post => {
  console.log(slug, locale, 'ha')
  const POSTS_PATH = path.join(process.cwd(), `data/blog/${locale}`);
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  console.log(content, data, 'data')

  return {
    content,
    meta: {
      link: data.link,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      cover: data.cover ?? "",
      metaImage: data.metaImage ?? "",
      type: data.type ?? "",
    },
  };
};