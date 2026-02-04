import { Link } from 'react-router-dom';

// IMPORT CSS
import '../styling/footer.css';

function Footer() {
    return(
        <div className='footer-header'>
            <div className='footer-details'>
                <div className='footer-logo'>
                    <h1>Tearista Fruit</h1>
                    <p>Your one-stop shop for fresh, delicious, and premium fruits!</p>
                </div>

                <div className='footer-links'>
                    <div className='footer-col'>
                        <h4>Links</h4>
                        <ul>
                            <li><Link to='/' >Home</Link></li>
                            <li><Link to='/product' >Product</Link></li>
                            <li><Link to='/blog' >Blog</Link></li>
                            <li><Link to='/contact' >Contact</Link></li>
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h4>Location</h4>
                        <ul className='footer-location-detail'>
                            <li><i className='fas fa-location-dot'></i><span>902 Jurong West Street 91, Singapore 64901</span></li>
                            <li><i className='fas fa-paper-plane'></i><span>tearistafruit@gmail.com</span></li>
                            <li><i className='fas fa-mobile'></i><span>+6512345678</span></li>
                        </ul>
                    </div>

                    <div className='footer-col'>
                        <h4>Find us on</h4>
                        <ul className='footer-media-social'>
                            <li><i className='fab fa-instagram'></i><span>@tearistafruitofficial.id</span></li>
                            <li><i className='fab fa-facebook'></i><span>tearistafruitofficial.id</span></li>
                            <li><i className='fab fa-whatsapp'></i><span>+6512345678</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='footer-copyright'>
                <p>
                    Tearista Fruit ©2025 made by Tearista. All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer;