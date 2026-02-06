import { useState } from 'react';
import toast from 'react-hot-toast'; // 1. Import Toast

// IMPORT CSS
import '../styling/news.css';

// IMPORT MOTION
import MotionWrapper from '../components/motion-animation/MotionWrapper';

function News() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            
            toast.success('Subscribed to Newsletter!', {
                duration: 2000,
                position: 'top-center'
            });

            setEmail('');
        }, 500);
    };

    return (
        <>
            <MotionWrapper delay={0}>
                <div className='news-section'>
                    <div className='news-banner'>
                        <h1 className='news-banner-text'>
                            Subscribe <span>Newsletter</span>
                        </h1>

                        <form className='news-subscribe' onSubmit={handleSubscribe}>
                            <label htmlFor='news-input'></label>
                            
                            <input 
                                type='email'
                                className='news-input'
                                placeholder='Enter your email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            
                            <button
                                className='news-button'
                                disabled={loading}
                                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Wait...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>
            </MotionWrapper>
        </>
    )
}

export default News;