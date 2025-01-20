'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Team members data
const team = [
  {
    id: 1,
    name: "Emma Stone",
    role: "Founder & Creative Director",
    image: "/images/team/emma.jpg",
    bio: "With over 15 years of experience in luxury jewelry design, Emma brings her unique vision and passion for timeless elegance to every piece."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Master Craftsman",
    image: "/images/team/michael.jpg",
    bio: "With decades of experience in traditional craftsmanship, Michael ensures the highest quality in every creation."
  },
  {
    id: 3,
    name: "Sophie Williams",
    role: "Design Lead",
    image: "/images/team/sophie.jpg",
    bio: "Leading our design innovation, Sophie creates pieces that blend contemporary style with timeless beauty."
  }
];

// Timeline data
const timeline = [
  {
    id: 1,
    year: "1970",
    title: "The Beginning",
    description: "Founded with a vision to create timeless jewelry pieces that tell unique stories."
  },
  {
    id: 2,
    year: "1985",
    title: "International Recognition",
    description: "Expanded globally, bringing our unique designs to jewelry enthusiasts worldwide."
  },
  {
    id: 3,
    year: "2000",
    title: "Innovation in Design",
    description: "Introduced contemporary collections while maintaining our commitment to craftsmanship."
  },
  {
    id: 4,
    year: "2024",
    title: "Sustainable Future",
    description: "Committed to sustainable practices and ethical sourcing in jewelry creation."
  }
];

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 bg-warm-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-24">
        <Image
          src="/images/heritage/craft-4.jpg"
          alt="Our Workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark-teal/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              A legacy of craftsmanship since 1970
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-serif mb-8 text-dark-teal">Our Heritage</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              For over five decades, Eglanto has been at the forefront of luxury jewelry creation, 
              combining traditional craftsmanship with contemporary design. Our journey began in 1970 
              with a simple yet powerful vision: to create jewelry that not only adorns but tells stories.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we continue to uphold the values of exceptional quality, innovative design, and 
              personal service that have defined us since our founding. Each piece we create is a 
              testament to our commitment to excellence and our passion for timeless beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-24 mb-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-serif mb-16 text-dark-teal text-center"
          >
            Our Journey
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-gold text-4xl font-serif mb-4">{item.year}</div>
                <h3 className="text-xl font-serif mb-2 text-dark-teal">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-6 text-dark-teal">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The passionate individuals behind our exquisite creations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-serif mb-2 text-dark-teal">{member.name}</h3>
              <p className="text-gold mb-4">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
