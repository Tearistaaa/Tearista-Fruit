// Import css
import '../styling/news.css';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

function News() {
    return (
        <>
            <MotionWrapper delay={0}>
                <div className='news-section'>
                    <div className='news-banner'>
                        <h1 className='news-banner-text'>
                            Subscribe <span>Newsletter</span>
                        </h1>

                        <div className='news-subscribe'>
                            <label htmlFor='news-input'></label>
                            <input type='text' className='news-input' placeholder='Enter your email address ' />
                            <button className='news-button'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </MotionWrapper>
        </>
    )
}

export default News;