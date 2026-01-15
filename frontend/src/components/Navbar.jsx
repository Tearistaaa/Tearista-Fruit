
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
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Product</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                      
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
