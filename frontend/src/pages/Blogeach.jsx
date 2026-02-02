import { Link, useParams } from 'react-router-dom';
import MotionWrapper from '../components/motion-animation/MotionWrapper';
import ItemBlog from '../data/BlogData';
import '../global.css';
import '../styling/blogeach.css';

function BlogEach() {
    const { id } = useParams();
    
    const blog = ItemBlog.find((item) => item.id === parseInt(id));

    if (!blog) {
        return (
            <div className='blog-not-found'>
                <h2>Blog Post Not Found</h2>
                <Link to="/blog" className="back-btn">Back to Blog</Link>
            </div>
        );
    }

    return (
        <MotionWrapper type='banner'>
            <div className="blog-detail-container">
                <Link to="/blog" className="back-btn">&larr; Back to Blog List</Link>
                
                <header className="blog-detail-header">
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    
                    <div className="blog-detail-meta">
                        <div className="blog-meta-item">
                            <span>By <strong>{blog.author}</strong></span>
                        </div>
                        <div className="blog-meta-item">
                            <span>|</span>
                        </div>
                        <div className="blog-meta-item">
                            <span>{blog.date}</span>
                        </div>
                        <div className="blog-meta-item">
                            <span>at {blog.time}</span>
                        </div>
                    </div>
                </header>

                <div className="blog-detail-image-wrapper">
                    <img src={blog.img} alt={blog.title} />
                </div>

                <article className="blog-detail-content">
                    {/* Mengubah newline menjadi paragraf */}
                    {blog.content.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </article>
            </div>
        </MotionWrapper>
    );
}

export default BlogEach;