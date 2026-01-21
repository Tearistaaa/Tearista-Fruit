// Import css
import '../styling/home.css';

// Import Pages
import Arrival from '../pages/Arrival.jsx';
import Banners from '../pages/Banner.jsx';
import Contact from '../pages/Contact.jsx';
import News from '../pages/News.jsx';
import Product from '../pages/Product.jsx';
import Service from '../pages/Service.jsx';
import Supplier from '../pages/Supplier.jsx';

function Home() {
    return (
        <>
            <Banners />
            <Arrival />
            <Product />
            <Service />
            <News />
            <Supplier />
            <Contact />
        </>
    )
}

export default Home;