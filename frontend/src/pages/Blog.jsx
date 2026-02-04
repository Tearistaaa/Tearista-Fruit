import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/blog.css';

// IMPORT MOTION
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// IMPORT DATA
import ItemBlog from '../data/BlogData';

function Blogs() {
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
                {ItemBlog.map((blog, index) => (
                    <MotionWrapper
                        key={index}
                        className='blog-card'
                        delay={index * 0.2} 
                    >
                        <div className='blog-card-img'>
                            <img src={blog.img} alt={blog.desc} />
                        </div>

                        <div className='blog-card-content'>
                            <h3 className='blog-card-content-desc'>{blog.desc}</h3>
                            <Link to={`/blog/${blog.id}`} className='read-more'>Read more &gt;</Link>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </>
    )
}

export default Blogs;