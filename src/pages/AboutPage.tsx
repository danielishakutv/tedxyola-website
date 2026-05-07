import { motion } from 'framer-motion';
import { Users, Target, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Daniel Ishaku',
    role: 'Lead / Curator',
    image: '/images/team/daniel-ishaku.jpg',
  },
  {
    name: 'TBA',
    role: 'Operations Director',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Speaker Program & Coaching Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Production & Stage Director',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Creative Director',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Partnerships & Sponsorships Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Finance & Compliance Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Marketing, Communications & PR Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Community & Audience Experience Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Volunteer Coordinator',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Digital & Media Lead',
    image: '/images/team/placeholder.jpg',
  },
  {
    name: 'TBA',
    role: 'Secretary',
    image: '/images/team/placeholder.jpg',
  },
];

export const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About TED<span className="text-ted-red">x</span>Yola
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              A platform for ideas worth spreading, rooted in Yola and open to the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#about" className="px-5 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors">TEDxYola</a>
              <a href="#team" className="px-5 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors">Our Team</a>
              <a href="/past-events" className="px-5 py-3 rounded-full bg-ted-red text-white font-semibold hover:bg-red-700 transition-colors">Past Events</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Located in Adamawa State in Nigeria's North-East, Yola is a city rich in culture, history, creativity, and resilience. TEDxYola was created to reflect this diversity—bringing together voices from different backgrounds, disciplines, and experiences to share ideas that challenge assumptions, inspire curiosity, and spark meaningful conversations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our goal is to create a space where local stories meet global perspectives, and where ideas emerging from our community can be heard, shared, and amplified far beyond our city.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Purpose
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              TEDxYola exists to:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Target className="w-8 h-8 text-ted-red mb-4" />
                <p className="text-gray-700">
                  Highlight innovative thinking and creative expression in and around Yola
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Users className="w-8 h-8 text-ted-red mb-4" />
                <p className="text-gray-700">
                  Encourage thoughtful dialogue on issues that shape our lives and future
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Globe className="w-8 h-8 text-ted-red mb-4" />
                <p className="text-gray-700">
                  Connect people across disciplines, generations, and communities
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Heart className="w-8 h-8 text-ted-red mb-4" />
                <p className="text-gray-700">
                  Inspire individuals to see new possibilities and take informed action
                </p>
              </motion.div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-8">
              We believe that powerful ideas are not defined by geography. They can emerge anywhere—and Yola has many stories, insights, and solutions worth sharing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What We Do
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TEDxYola organizes independently licensed TEDx events that feature short, carefully curated talks, performances, and experiences. Each event explores a range of topics—from science and technology to culture, arts, education, environment, and social innovation—ensuring diversity of ideas and perspectives.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every edition of TEDxYola is shaped by a unifying theme, which guides the conversation for that year and is highlighted on our homepage. These themes evolve over time, reflecting new questions, challenges, and opportunities relevant to our community and the wider world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Attend TEDxYola */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Attend TED<span className="text-ted-red">x</span>Yola</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Leave with ideas you can use, people you can build with, and energy that lasts long after the event.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: 'Actionable ideas, not fluff',
              body: 'Talks are under 18 minutes and crafted to give you clear insights, frameworks, and next steps you can apply immediately.'
            }, {
              title: 'Meet collaborators',
              body: 'Connect with founders, creatives, policy shapers, technologists, and community leaders ready to partner on real projects.'
            }, {
              title: 'See Yola spotlighted',
              body: 'Experience stories, innovation, and culture from the North-East showcased on a global TEDx stage.'
            }, {
              title: 'Energy you can feel',
              body: 'Live performances, art, and immersive moments designed to recharge your creativity and perspective.'
            }, {
              title: 'Coaching-quality talks',
              body: 'Speakers are coached to be concise and audience-first, so every minute respects your time and attention.'
            }, {
              title: 'Momentum beyond the day',
              body: 'Join a community that keeps collaborating after the event—follow-up circles, projects, and channels to stay engaged.'
            }].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
            >
              <span>Get Your Ticket</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>        </div>
      </section>

      {/* Our Community */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Community
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              TEDxYola is powered by a community of volunteers, speakers, partners, and attendees who share a commitment to learning, creativity, and positive change. We prioritize inclusivity, first-time voices, and ideas that are thoughtful, evidence-based, and impactful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About TEDxYola */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About TED<span className="text-ted-red">x</span>Yola
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                TEDxYola is a locally organized, community-powered platform rooted in the spirit of Yola: curious, resilient, and forward-looking. We convene voices from the North-East and beyond to share ideas that challenge assumptions and inspire action.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Each edition curates speakers, performers, and experiences that reflect Yola's unique blend of culture, creativity, and innovation—while connecting our stories to the global TEDx community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
                <div className="p-3 rounded-xl bg-gray-50">Community-built and volunteer-led</div>
                <div className="p-3 rounded-xl bg-gray-50">Platform for first-time voices</div>
                <div className="p-3 rounded-xl bg-gray-50">Ideas spanning tech, culture, impact</div>
                <div className="p-3 rounded-xl bg-gray-50">Stories grounded in Yola, shared globally</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-ted-red/80 to-black/80 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">What makes our stage special</h3>
              <ul className="space-y-3 text-white/90 leading-relaxed">
                <li>Curated talks under 18 minutes—concise, memorable, and actionable.</li>
                <li>Balanced lineup of thinkers, makers, and community voices.</li>
                <li>Performances and experiences that celebrate the culture of Yola.</li>
                <li>Guided speaker coaching to keep ideas sharp and audience-first.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is TEDx? */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is TEDx?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                TEDx events are independently organized gatherings licensed by TED. They follow TED's guidelines and share the mission of spreading ideas that matter, while remaining locally curated to reflect each community's voice.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Talks are non-commercial, non-political, and focused on ideas—never promotion. Every TEDx event commits to accessibility, diversity of thought, and an audience-first experience.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">TEDx essentials</h3>
              <div className="space-y-3 text-gray-800 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">Licensed by TED, produced by local teams</div>
                <div className="p-3 rounded-xl bg-gray-50">Talks capped at 18 minutes to keep ideas tight</div>
                <div className="p-3 rounded-xl bg-gray-50">Non-commercial and non-political content</div>
                <div className="p-3 rounded-xl bg-gray-50">Global community with local storytelling</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Yola */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Yola
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Yola is more than a location—it is a meeting point of cultures, perspectives, and possibilities. TEDxYola reflects the spirit of the city: open, resilient, curious, and forward-looking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind TEDxYola
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-ted-red/20 to-gray-900/20 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=E62B1E&color=fff&bold=true`;
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
