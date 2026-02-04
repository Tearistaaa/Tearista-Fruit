import { Link } from 'react-router-dom';

// Import css
import '../styling/banner.css';

// Import Motion
import MotionImage from '../components/motion-animation/MotionImage';

// Import URL
const STORAGE_URL = 'https://nmgxcwccfdslbfhmcfqe.supabase.co/storage/v1/object/public/tearista-assets/banner/'

function Banners() {
    const bannerImg = `${STORAGE_URL}banner.jpeg`;

    return (
        <>
            <div className='banner-section'>
                <MotionImage src={bannerImg} alt='Banner'/>
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