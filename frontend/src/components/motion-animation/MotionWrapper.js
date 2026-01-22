import { motion } from 'framer-motion';

const presets = {
    banner: {
        initial: { opacity: 0, y: -50},
        whileInView: { opacity: 1, y: 0},
        transition: { duration: 0.5 },
        viewport: { once: true, amount: 0.3 },
    },
    card: (index = 0) => ({
        initial: { opacity: 0, y: 50},
        whileInView: { opacity: 1, y: 0},
        transition: { delay: index * 0.2, duration: 0.5},
        whileHover: { scale: 1.05},
        viewport: { once: true, amount: 0.3},
    }),
};

function MotionWrapper({ children, className, type, index = 0, delay }) {
    let animationProps = {};

    if (type === 'card') {
        animationProps = presets.card(index);
    } else if (type === 'banner') {
        animationProps = presets.banner;
    } else {
        animationProps = {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0},
            viewport: { once: true, margin: '-100px 0px'},
            transition: { duration: 0.6, delay: delay || 0},
        };
    }

    if (delay !== undefined) {
        animationProps.transition = { ...animationProps.transition, delay };
    }

    return (
        <motion.div className={className} {...animationProps}>
            {children}
        </motion.div>
    );
}

export default MotionWrapper;