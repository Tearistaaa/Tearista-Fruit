import { Link } from 'react-router-dom';

// IMPORT CSS
import '../styling/banner.css';

// IMPORT MOTION
import MotionImage from '../components/motion-animation/MotionImage';

// IMPORT URL
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
                        Shop Now <i class="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Banners;