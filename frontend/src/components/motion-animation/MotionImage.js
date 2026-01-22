import { motion } from 'framer-motion';

function MotionImage({ src, alt }) {
    return (
        <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px 0px'}}
            transition={{ duration: 0.8 }}
        />
    );
}

export default MotionImage;