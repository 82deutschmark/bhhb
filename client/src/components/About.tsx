import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#1a1a1a] mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-[#333333] mb-12 leading-relaxed">
            At Big Happy Holding Company, we believe in fostering growth through
            strategic partnerships and innovative solutions. Our mission is to
            create lasting value for our stakeholders while maintaining the highest
            standards of corporate responsibility and ethical business practices.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "Pushing boundaries and embracing new technologies to stay ahead.",
              },
              {
                title: "Excellence",
                description:
                  "Committed to delivering outstanding results in everything we do.",
              },
              {
                title: "Integrity",
                description:
                  "Building trust through transparent and ethical business practices.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-montserrat font-bold text-[#1a1a1a] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#333333]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
