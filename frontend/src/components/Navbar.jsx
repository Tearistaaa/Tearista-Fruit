import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Import css
import '../styling/navbar.css';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);
    return (
        <>
            <div className='navbar-header'>
                <div className='navbar-logo'>
                    <h1>Tearista Fruit</h1>
                </div>

                <div className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                    <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>

                <div className={`navbar-menus ${menuOpen ? 'active': ''}`}>
                    <ul>
                        <li><NavLink to='/' onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to='/product' onClick={closeMenu}>Product</NavLink></li>
                        <li><NavLink to='/blog' onClick={closeMenu}>Blog</NavLink></li>
                        <li><NavLink to='/contact' onClick={closeMenu}>Contact</NavLink></li>
                    </ul>

                    <div className='navbar-button-mobile'>
                        <button className='helper-button'>
                            <i className='fas fa-headset'></i>
                            <span>Helper</span>
                        </button>

                        <button className='cart-button'>
                            <i className='fas fa-shopping-cart'></i>
                            <span>Cart</span>
                        </button>

                        <button className='login-button'>
                            <i className='fas fa-user-circle'></i>
                            <span>Login</span>
                        </button>
                    </div>
                </div>

                <div className='navbar-button'>
                    <button className='helper-button'>
                        <i className='fas fa-headset' />
                    </button>

                    <button className='cart-button'>
                        <i className='fas fa-shopping-cart' />
                    </button>

                    <button className='login-button'>
                        <i className='fas fa-user-circle' />
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavBar;