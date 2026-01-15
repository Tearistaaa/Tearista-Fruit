import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import '../styling/home.css';
import Blog from './Blog.jsx';
import Contact from './Contact.jsx';
import Product from './Product.jsx';

function Home() {
    return(
        <>
            <Navbar />
            <Product />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}

export default Home;