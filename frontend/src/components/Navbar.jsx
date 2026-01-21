import { Link } from 'react-router-dom';

// Import css
import '../styling/navbar.css';

function NavBar() {
    return (
        <>
            {/* ================= NAVBAR ================= */}
            <div className='navbar-header'>
                <div className='navbar-logo'>
                    <h1>Tearista Fruit</h1>
                </div>

                <div className='navbar-menus'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/product'>Product</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
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
