import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/content/blog';

export const RecentNews = () => {
  const recentPosts = blogPosts.slice(0, 3);

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
          Recent News & Updates
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay up to date with the latest from TEDxYola
        </p>
      </motion.div>

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
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
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

            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ted-red transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <button className="inline-flex items-center gap-2 text-ted-red font-semibold hover:gap-3 transition-all">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105">
          <span>View All News</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};
