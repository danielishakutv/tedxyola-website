import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Newspaper } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { useBlogs, excerptOf, formatBlogDate } from '@/lib/blogs';

export const BlogsPage = () => {
  const { blogs, loading, error } = useBlogs();
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.category && set.add(b.category));
    return ['All', ...Array.from(set).sort()];
  }, [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs
      .filter((b) => category === 'All' || b.category === category)
      .filter(
        (b) =>
          !q ||
          b.title.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
  }, [blogs, category, query]);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <Section background="black" className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ted-red/10 border border-ted-red/30 rounded-full text-ted-red text-sm font-semibold mb-6">
            <Newspaper className="w-4 h-4" />
            <span>News &amp; Stories</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold font-display mb-6">
            The TEDxYola Blog
          </h1>
          <p className="text-lg lg:text-xl text-white/70 leading-relaxed">
            Announcements, behind-the-scenes stories, and ideas worth spreading
            from the TEDxYola community.
          </p>
        </motion.div>
      </Section>

      {/* Filters */}
      <Section background="black" className="pt-2 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, topics…"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-ted-red transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat
                    ? 'bg-ted-red text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Grid */}
      <Section background="black" className="pb-20">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/20 border-t-ted-red rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-white/70">
              We couldn't load the blog right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">
              No articles match your search. Try a different keyword or category.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-ted-red text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatBlogDate(post.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ted-red transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {excerptOf(post.content, 180)}
                  </p>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-ted-red font-semibold hover:gap-3 transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};
