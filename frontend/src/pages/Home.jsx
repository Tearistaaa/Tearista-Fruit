// Import css
import '../styling/home.css';

// Import pages
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import Arrival from './Arrival.jsx';
import Banners from './Banner.jsx';
import Blogs from './Blog.jsx';
import Contact from './Contact.jsx';
import Product from './Product.jsx';
import Service from './Service.jsx';
import Suppliers from './Supplier.jsx';

function Home() {
    return(
        <>
            <Navbar />
            <Banners />
            <Arrival />
            <Product />
            <Service />
            <Suppliers />
            <Blogs />
            <Contact />
            <Footer />
        </>
    )
}

export default Home;