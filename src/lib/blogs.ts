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

/**
 * Convert rich-text HTML to plain text (tags removed, entities like &nbsp;
 * decoded). Used for excerpts, read-time and search where markup would leak.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ');
  }
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Sanitize admin-authored HTML before rendering it with dangerouslySetInnerHTML.
 * Strips active content (script/style/iframeâ€¦), inline event handlers and
 * javascript: URLs, while preserving formatting markup from the editor.
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return '';
  if (typeof document === 'undefined') return html;
  const tmp = document.createElement('div');
  tmp.innerHTML = html;

  tmp
    .querySelectorAll('script, style, iframe, object, embed, link, meta, form')
    .forEach((el) => el.remove());

  tmp.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.replace(/\s+/g, '').toLowerCase();
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      } else if (
        (name === 'href' || name === 'src' || name === 'xlink:href') &&
        value.startsWith('javascript:')
      ) {
        el.removeAttribute(attr.name);
      }
    });
    // Open links in a new, safe tab
    if (el.tagName === 'A' && el.getAttribute('href')) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return tmp.innerHTML;
}

export function excerptOf(content: string, maxLen = 160): string {
  const plain = stripHtml(content).replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + 'â€¦';
}

export function readTimeOf(content: string): number {
  const words = stripHtml(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
