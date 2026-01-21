// Import css
import '../global.css';
import '../styling/blog.css';

// Import data
import ItemBlog from '../data/BlogData';

function Blogs() {
    return(
        <>
            <div className='blog-section'>
                <h1 className='title'>Latest Blog</h1>
                <p className='desc'>Keep up with the latest stories and updates.</p>
            </div>

            <div className='blog-card-container'>
                {ItemBlog.map((blog, index) => (
                    <>
                        <div className='blog-card-img'>
                            <img src={blog.img} alt={blog.desc} />
                        </div>

                        <div className='blog-card-content'>
                            <h3 className='blog-card-content-desc'>{blog.desc}</h3>
                            <a href={blog.link} className='read-more'>Read more &gt;</a>
                        </div>
                    </>
                    
                ))}
            </div>
        </>
    )
}

export default Blogs;