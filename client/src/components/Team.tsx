import { motion } from "framer-motion";

const team = [
  {
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec",
    bio: "With over 20 years of experience in corporate leadership, Sarah drives our strategic vision and growth initiatives.",
  },
  {
    name: "Michael Chen",
    title: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1554774853-b415df9eeb92",
    bio: "A certified CPA with expertise in M&A and corporate finance, Michael ensures our financial excellence and stability.",
  },
  {
    name: "David Martinez",
    title: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1554774853-6a56f62c6451",
    bio: "David brings 15 years of operational expertise, optimizing our processes and driving efficiency across portfolios.",
  },
  {
    name: "Emily Taylor",
    title: "Chief Strategy Officer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    bio: "Emily leads our strategic initiatives, identifying growth opportunities and fostering innovation across our holdings.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#1a1a1a] mb-4">
            Our Leadership Team
          </h2>
          <p className="text-lg text-[#333333] max-w-2xl mx-auto">
            Meet the experienced professionals who guide our strategic direction
            and ensure our continued success.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-bold text-[#1a1a1a] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#ffcc00] font-medium mb-4">{member.title}</p>
                <p className="text-[#333333]">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
