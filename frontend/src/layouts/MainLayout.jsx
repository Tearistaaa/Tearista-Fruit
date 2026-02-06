import { Outlet } from 'react-router-dom';

// IMPORT PAGES
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Helper from '../pages/Helper';
import ScrollToTop from './ScrollToTop';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      
      <ScrollToTop />
      
      <main>
        <Outlet />
      </main>

      <Footer />

      <Helper />
    </>
  );
};

export default MainLayout;