import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/blog.css';

// IMPORT MOTION
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// IMPORT LOADING
import Loading from '../components/Loading';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load Blog:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading text="Loading Latest Stories..." />;
    }

    return (
        <>
            <div className='blog-section'>
                <MotionWrapper className='blog-banner' type='banner'>
                    <h1 className='title'>Latest Blog</h1>
                    <p className='desc'>
                        Keep up with the latest stories and updates.
                    </p>
                </MotionWrapper>
            </div>

            <div className='blog-card-container'>
                {blogs.map((blog, index) => (
                    <MotionWrapper
                        key={blog.id}
                        className='blog-card'
                        delay={index * 0.1}
                    >
                        <div className='blog-card-img'>
                            <img src={blog.image_url} alt={blog.title} />
                        </div>

                        <div className='blog-card-content'>
                            <h3 className='blog-card-content-desc'>{blog.title}</h3>
                            <Link to={`/blog/${blog.id}`} className='read-more'>
                                Read more
                            </Link>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </>
    )
}

export default Blogs;