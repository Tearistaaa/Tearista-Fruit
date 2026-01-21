// Import css
import '../styling/banner.css';

// Import Images
import Banner from '../images/banner/banner.jpeg';

function Banners() {
    return (
        <>
            <div className='banner-section'>
                <img src={Banner} alt='Banner' />
                <div className='banner-text'>
                    <h3 className='banner-text-category'>Organic Fruit</h3>
                    <h1 className='banner-text-desc'>
                        <span>Fresh Fruits</span>
                        <span>Spring Sale</span>
                    </h1>

                    <button className='banner-button'>
                        Shop Now
                        <i className='fas fa-long-arrow-alt-right'></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Banners;