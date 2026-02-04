import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

// IMPORT ELEMENT
import MainLayout from './layouts/MainLayout.jsx';
import BlogEach from './pages/Blogeach.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import BlogPage from './wrapper/BlogPage.jsx';
import ContactPage from './wrapper/ContactPage.jsx';
import HomePage from './wrapper/HomePage.jsx';
import ProductPage from './wrapper/ProductPage.jsx';

function App() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} /> 

      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/contact' element={<ContactPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/blog/:id' element={<BlogEach />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;