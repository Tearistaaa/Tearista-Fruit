import { Route, Routes } from 'react-router-dom';

// Import Element
import MainLayout from './layouts/MainLayout.jsx';
import BlogPage from './wrapper/BlogPage.jsx';
import ContactPage from './wrapper/ContactPage.jsx';
import HomePage from './wrapper/HomePage.jsx';
import ProductPage from './wrapper/ProductPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;