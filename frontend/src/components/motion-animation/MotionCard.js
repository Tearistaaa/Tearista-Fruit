import { motion } from 'framer-motion';

function MotionCard({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px 0px'}}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

export default MotionCard;