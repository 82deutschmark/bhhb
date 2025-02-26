import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6">
            Building Tomorrow's Success Today
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Big Happy Holding Company is your trusted partner in business growth
            and innovation. We transform visions into reality through strategic
            investments and operational excellence.
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
