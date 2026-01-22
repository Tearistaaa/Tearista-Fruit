// Import css
import '../global.css';
import '../styling/blog.css';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// Import data
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
                        type='card'
                        index={index}
                    >
                        <div className='blog-card-img'>
                            <img src={blog.img} alt={blog.desc} />
                        </div>

                        <div className='blog-card-content'>
                            <h3 className='blog-card-content-desc'>{blog.desc}</h3>
                            <a href={blog.link} className='read-more'>Read more &gt;</a>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </>
    )
}

export default Blogs;