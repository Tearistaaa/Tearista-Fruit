import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/blogeach.css';

// IMPORT MOTION
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// IMPORT LOADING (BARU)
import Loading from '../components/Loading';

function BlogEach() {
    const { id } = useParams();
    
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/blogs/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Blog not found");
                }
                return res.json();
            })
            .then(data => {
                setBlog(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading text="Loading Article..." />;
    }

    if (error || !blog) {
        return (
            <div className='blog-not-found'>
                <h2>Blog Post Not Found</h2>
                <Link to='/blog' className='back-btn'>Back to Blog</Link>
            </div>
        );
    }

    const dateObj = new Date(blog.created_at);
    const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <MotionWrapper type='banner'>
            <div className='blog-detail-container'>
                <Link to='/blog' className='back-btn'>&larr; Back to Blog List</Link>
                
                <header className='blog-detail-header'>
                    <h1 className='blog-detail-title'>{blog.title}</h1>
                    
                    <div className='blog-detail-meta'>
                        <div className='blog-meta-item'>
                            <span>By <strong>{blog.author || 'Admin'}</strong></span>
                        </div>
                        <div className='blog-meta-item'>
                            <span>|</span>
                        </div>
                        <div className='blog-meta-item'>
                            <span>{dateStr}</span>
                        </div>
                        <div className='blog-meta-item'>
                            <span>at {timeStr}</span>
                        </div>
                    </div>
                </header>

                <div className='blog-detail-image-wrapper'>
                    <img src={blog.image_url} alt={blog.title} />
                </div>

                <article className='blog-detail-content'>
                    {blog.content ? (
                        blog.content.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))
                    ) : (
                        <p>No content available.</p>
                    )}
                </article>
            </div>
        </MotionWrapper>
    );
}

export default BlogEach;