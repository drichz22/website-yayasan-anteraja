import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && (isHeadline != true || !defined(isHeadline)) && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getHeadlinePost(): Promise<Post | null> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && isHeadline == true && defined(slug.current)][0]`
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
