import fs from 'fs';
import { Feed } from 'feed';
import { getAllPosts } from "@/lib/blog";

export default async function generateRssFeed() {
  // ok how to do this with ru?
  const posts = await getAllPosts("en");
  const siteURL = "https://karinakupp.com";
  const date = new Date();
  const author = {
    name: "Karina Kupp",
    email: "karinakupp@gmail.com",
    link: "https://instagram.com/karinakupp",
  };
  const feed = new Feed({
    title: "Karina Kupp blog",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/karinakupp.jpeg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Karina Kupp`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  posts.forEach((post) => {
    const url = post.meta.link.includes("http") ? post.meta.link : `${siteURL}/blog/${post.meta.link}`;
    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.excerpt,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.meta.date),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());


  // for ru
  const postsRU = await getAllPosts("ru");
  const authorRU = {
    name: "Карина Куприянович",
    email: "karinakupp@gmail.com",
    link: "https://instagram.com/karinakupp",
  };
  const feedRU = new Feed({
    title: "Записки Карины",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/karinakupp.jpeg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Karina Kupp`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  postsRU.forEach((post) => {
    const url = post.meta.link.includes("http") ? post.meta.link : `${siteURL}/blog/${post.meta.link}`;
    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.excerpt,
      content: post.content,
      author: [authorRU],
      contributor: [authorRU],
      date: new Date(post.meta.date),
    });
  });

  fs.mkdirSync("./public/rss/ru", { recursive: true });
  fs.writeFileSync("./public/rss/ru/feed.xml", feedRU.rss2());
  fs.writeFileSync("./public/rss/ru/atom.xml", feedRU.atom1());
  fs.writeFileSync("./public/rss/ru/feed.json", feedRU.json1());
}