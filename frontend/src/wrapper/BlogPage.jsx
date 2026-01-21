// Import css
import '../styling/blog.css';

// Import pages
import Blogs from '../pages/Blog.jsx';

function BlogPage() {
    return (
        <>
            <div style={{ paddingTop: '100px', paddingBottom: '50px'}}>
                <Blogs />
            </div>
        </>
    )
}

export default BlogPage;