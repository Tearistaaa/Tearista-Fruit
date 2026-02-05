import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// IMPORT PROFILE PAGE
import Profile from '../pages/Profile';

// IMPORT CSS
import '../styling/navbar.css';

// IMPORT MODAL
import ModalCart from './modal/ModalCart';

function NavBar() {
    const { cartItems } = useAppContext();
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className='navbar-header'>
            <div className='navbar-logo'><h1>Tearista Fruit</h1></div>

            <div className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                <i className={`fas ${menuOpen ? 'fa fa-times' : 'fa-bars'}`}></i>
            </div>

            <div className={`navbar-menus ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><NavLink to='/' onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to='/product' onClick={closeMenu}>Product</NavLink></li>
                    <li><NavLink to='/blog' onClick={closeMenu}>Blog</NavLink></li>
                    <li><NavLink to='/contact' onClick={closeMenu}>Contact</NavLink></li>
                </ul>

                <div className='navbar-button-mobile'>
                    <button className='helper-button'><i className='fas fa-headset'></i><span>Helper</span></button>
                    
                    <button className='cart-button' onClick={() => setCartOpen(true)}>
                        <i className='fas fa-shopping-cart'></i><span>Cart</span>
                        {cartItems.length > 0 && <span className='cart-badge'>{cartItems.length}</span>}
                    </button>
                    
                    <Profile isMobile={true} closeMenu={closeMenu} />
                </div>
            </div>

            <div className='navbar-button'>
                <button className='helper-button'><i className='fas fa-headset' /></button>
                <button className='cart-button' onClick={() => setCartOpen(true)}>
                    <i className='fas fa-shopping-cart' />
                </button>
                <Profile />
            </div>

            <ModalCart
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
            />
        </div>
    );
}

export default NavBar;