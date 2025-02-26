import { motion } from "framer-motion";

const team = [
  {
    name: "Andreas Vagelatos",
    title: "Chief Executive Officer & Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec",
    bio: "As CEO and CFO, Andreas leads our company's strategic direction and financial management, overseeing all business operations and ensuring sound financial planning and reporting.",
  },
  {
    name: "Mark Barney",
    title: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1554774853-b415df9eeb92",
    bio: "Mark oversees our technological development and infrastructure, driving innovation and ensuring robust technical solutions across our portfolio companies.",
  },
  {
    name: "Brianne Baker",
    title: "Chief Creative Officer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    bio: "Brianne leads our creative direction, ensuring excellence in design and innovation across all our projects and products.",
  },
  {
    name: "Eric Dickinson",
    title: "General Counsel",
    image: "https://images.unsplash.com/photo-1554774853-6a56f62c6451",
    bio: "Eric manages all legal affairs of the company, providing crucial guidance on legal matters and ensuring compliance across our operations.",
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
            Led by experienced professionals, our management team brings together diverse expertise to guide our strategic direction and ensure operational excellence.
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