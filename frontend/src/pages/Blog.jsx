// Import css
import '../global.css';
import '../styling/blog.css';

// Import images and dummy data
import BananaBlog from '../images/blog/banana-blog.webp';
import PearBlog from '../images/blog/pear-blog.webp';

const ItemBlog = [
  {
    img: BananaBlog,
    desc: "Rico's Bananas are the best in the world: What's the secret?",
    link: '#readmore'
  },
  {
    img: PearBlog,
    desc: 'Edward on Pears: seeds and water are the key.',
    link: '#readmore'
  }
];

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