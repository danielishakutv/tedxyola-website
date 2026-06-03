import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2 } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { useBlog, useBlogs, formatBlogDate, readTimeOf, excerptOf } from '@/lib/blogs';

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading, error } = useBlog(id);
  const { blogs: allBlogs } = useBlogs();

  const related = useMemo(() => {
    if (!blog) return [];
    return allBlogs
      .filter((b) => b.id !== blog.id && b.category === blog.category)
      .slice(0, 3);
  }, [allBlogs, blog]);

  const onShare = async () => {
    if (!blog) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    } catch {
      /* ignore */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-ted-red rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-white/70 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ted-red hover:bg-red-700 text-white font-semibold rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero image */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      {/* Title + meta */}
      <Section background="black" className="pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="inline-block px-3 py-1 bg-ted-red text-white text-xs font-semibold rounded-full mb-4">
            {blog.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70 text-sm pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatBlogDate(blog.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTimeOf(blog.content)} min read</span>
            </div>
            <button
              onClick={onShare}
              className="ml-auto inline-flex items-center gap-2 text-white/70 hover:text-ted-red transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Content */}
      <Section background="black" className="pt-2 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="prose prose-lg prose-invert max-w-none text-white/85 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </motion.div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section background="black" className="pb-20 border-t border-white/10 pt-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all group"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-gray-900 font-bold mb-2 line-clamp-2 group-hover:text-ted-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {excerptOf(post.content, 120)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};
