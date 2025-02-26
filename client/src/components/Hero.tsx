import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.7))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6">
            Welcome to Big Happy Holdings
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            A dynamic holding company led by industry experts in technology, finance, creative direction, and legal affairs. We combine strategic vision with operational excellence to drive sustainable growth and innovation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ffcc00] text-[#1a1a1a] px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}