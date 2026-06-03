import { useEffect, useState } from 'react';

export type Blog = {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  publishDate: string;
  createdAt?: string;
};

const API_BASE = 'https://speaker.tedxyola.com';

export async function fetchBlogs(signal?: AbortSignal): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/api/public/blogs`, { signal });
  if (!res.ok) throw new Error(`Blogs API ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchBlog(id: string, signal?: AbortSignal): Promise<Blog> {
  const res = await fetch(`${API_BASE}/api/public/blogs/${id}`, { signal });
  if (!res.ok) throw new Error(`Blog API ${res.status}`);
  return res.json();
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchBlogs(ctrl.signal)
      .then((d) => {
        setBlogs(d);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return { blogs, loading, error };
}

export function useBlog(id: string | undefined) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    fetchBlog(id, ctrl.signal)
      .then((d) => {
        setBlog(d);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [id]);

  return { blog, loading, error };
}

export function formatBlogDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function excerptOf(content: string, maxLen = 160): string {
  const plain = content.replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

export function readTimeOf(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
