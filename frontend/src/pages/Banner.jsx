import { Link } from 'react-router-dom';

// Import css
import '../styling/banner.css';

// Import Motion
import MotionImage from '../components/motion-animation/MotionImage';

// Import Images
import Banner from '../images/banner/banner.jpeg';

function Banners() {
    return (
        <>
            <div className='banner-section'>
                <MotionImage src={Banner} alt='Logo Banner'/>
                <div className='banner-text'>
                    <h3 className='banner-text-category'>Organic Fruit</h3>
                    <h1 className='banner-text-desc'>
                        <span>Fresh Fruits</span>
                        <span>Spring Sale</span>
                    </h1>

                    <Link to ='/product' className='banner-button'>
                        Shop Now
                        <i className='fas fa-long-arrow-alt-right'></i>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Banners;