import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Import css
import '../styling/navbar.css';

// Import Modal
import ModalCart from './modal/ModalCart';

// Import dummy
import Apple from '../images/fruit-image/Apple.png';
import Pear from '../images/fruit-image/Pear.png';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Apple', price: 12.7, qty: 1, image: Apple },
        { id: 2, name: 'Pear', price: 12.3, qty: 1, image: Pear }
    ]);

    const closeMenu = () => setMenuOpen(false);
    const increaseQty = (id) => setCartItems(items => items.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    const decreaseQty = (id) => setCartItems(items => items.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
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
                    <button className='cart-button' onClick={() => setCartOpen(true)}><i className='fas fa-shopping-cart'></i><span>Cart</span></button>
                    <button className='login-button'><i className='fas fa-user-circle'></i><span>Login</span></button>
                </div>
            </div>

            <div className='navbar-button'>
                <button className='helper-button'><i className='fas fa-headset' /></button>
                <button className='cart-button' onClick={() => setCartOpen(true)}><i className='fas fa-shopping-cart' /></button>
                <button className='login-button'><i className='fas fa-user-circle' /></button>
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
