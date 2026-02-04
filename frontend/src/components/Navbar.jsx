import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Import Pages
import Profile from '../pages/Profile';

// Import css
import '../styling/navbar.css';

// Import Modal
import ModalCart from './modal/ModalCart';

function NavBar() {
    const {user, cartItems, setCartItems} = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const increaseQty = (id) => setCartItems(items => items.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    const decreaseQty = (id) => setCartItems(items => items.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1} : item));

    const removeItem = (id) => setCartItems(items => items.filter(item => item.id !== id));

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
                    
                    {user ? (
                        <Link to='/profile' className='login-button' onClick={closeMenu} style={{ color: '#f5e07a'}}>
                            <i className='fas fa-user-circle'></i><span>Profile</span>
                        </Link>
                    ) : (
                        <Link to='/login' className='login-button' onClick={closeMenu}>
                            <i className='fas fa-user-circle'></i><span>Login</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className='navbar-button'>
                <button className='helper-button'><i className='fas fa-headset' /></button>
                <button className='cart-button' onClick={() => setCartOpen(true)}><i className='fas fa-shopping-cart' /></button>
                <Profile />

            </div>

            <ModalCart
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                cartItems={cartItems}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
            />
        </div>
    );
}

export default NavBar;
