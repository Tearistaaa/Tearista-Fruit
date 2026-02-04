import { Outlet } from 'react-router-dom';

// IMPORT PAGES
import Footer from '../components/Footer.jsx';
import NavBar from '../components/Navbar.jsx';
import ScrollToTop from './ScrollToTop.js';

function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;