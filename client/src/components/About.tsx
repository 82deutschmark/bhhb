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
            Our Structure
          </h2>
          <p className="text-lg text-[#333333] mb-12 leading-relaxed">
            Big Happy Holdings operates under a robust management structure, with decisions made by our Management Committee through majority voting. Our leadership team brings together diverse expertise across technology, finance, creative, and legal domains to ensure comprehensive oversight of our operations.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership",
                description:
                  "Guided by a Management Committee with proportional voting power based on membership interests.",
              },
              {
                title: "Expertise",
                description:
                  "Combining technical, financial, creative, and legal excellence in our executive team.",
              },
              {
                title: "Governance",
                description:
                  "Decisions made through majority voting, ensuring balanced and considered leadership.",
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