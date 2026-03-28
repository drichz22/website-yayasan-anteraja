import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(page: number): Promise<Post[]> {
  const pageSize = page === 1 ? 3 : 6;
  const start = page === 1 ? 0 : 3 + (page - 2) * 6;

  return await sanityClient.fetch(
    groq`*[_type == "post" && (isHeadline != true || !defined(isHeadline)) && defined(slug.current)] | order(_createdAt desc) [$start...$end]`, {start, end: start + pageSize}
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getHeadlinePost(page: number): Promise<Post | null> {
  if (page !== 1) return null;

  return await sanityClient.fetch(
    groq`*[_type == "post" && isHeadline == true && defined(slug.current)][0]`
  );
}

export async function getPostCount() {
  return await sanityClient.fetch(
    groq`count(*[_type == "post" && isHeadline != true])`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  category?: string;
  slug: Slug;
  description?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}
