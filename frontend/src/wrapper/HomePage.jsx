// Import Pages
import Arrival from '../pages/Arrival.jsx';
import Banners from '../pages/Banner.jsx';
import Blog from '../pages/Blog.jsx';
import Contact from '../pages/Contact.jsx';
import News from '../pages/News.jsx';
import Product from '../pages/Product.jsx';
import Service from '../pages/Service.jsx';
import Supplier from '../pages/Supplier.jsx';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper.js';

function Home() {
    return (
        <>
            <MotionWrapper>
                <Banners />
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
                <Arrival />
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
                <Product limit={7} showViewMore={true} />
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
                <Service />
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
                <News />
            </MotionWrapper>

            <MotionWrapper delay={0.5}>
                <Supplier />
            </MotionWrapper>

            <MotionWrapper delay={0.6}>
                <Blog />
            </MotionWrapper>

            <MotionWrapper delay={0.7}>
                <Contact />
            </MotionWrapper>
        </>
    )
}

export default Home;