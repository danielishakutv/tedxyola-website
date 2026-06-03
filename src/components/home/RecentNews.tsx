import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogs, excerptOf, formatBlogDate } from '@/lib/blogs';

export const RecentNews = () => {
  const { blogs, loading, error } = useBlogs();

  const recentPosts = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
          Recent News &amp; Updates
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay up to date with the latest from TEDxYola
        </p>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-ted-red rounded-full animate-spin" />
        </div>
      )}

      {!loading && (error || recentPosts.length === 0) && (
        <p className="text-center text-gray-500 py-10">
          {error ? "We couldn't load the latest news right now." : 'Check back soon for the latest news and updates.'}
        </p>
      )}

      {!loading && recentPosts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-ted-red text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
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

                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {excerptOf(post.content, 160)}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105"
        >
          <span>View All News</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
};
