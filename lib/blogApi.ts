// This is a set of functions for the Blog system.

import { bundleMDX } from 'mdx-bundler';
import fs from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}
type Items = {
  [key: string]: string;
};

export function getPostBySlug(slug: string, fields: string[] = []): Items {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {
    data,
    content,
  }: {
    data: Items;
    content: string;
  } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  for (const field of fields) {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  }

  return items;
}

export function getAllPosts(fields: string[] = []): Items[] {
  const slugs = getPostSlugs();
  return (
    slugs
      .map((slug) => getPostBySlug(slug, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}

type Parameters_ = {
  slug: string;
  frontmatter: { [key: string]: any };
  code: string;
};

export async function getPostData(slug: string): Promise<Parameters_> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');
  const { code, frontmatter } = await bundleMDX({ source: source });

  return {
    slug,
    frontmatter,
    code,
  };
}
