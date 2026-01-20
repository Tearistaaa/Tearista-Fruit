// Import css
import '../global.css';
import '../styling/service.css';

// Import Images and dummy data
import Eco from '../images/icon/eco.webp';
import Guarantee from '../images/icon/guarantee.webp';
import Secure from '../images/icon/secure.webp';
import Shipping from '../images/icon/shipping.webp';
import CustomerService from '../images/icon/support.webp';

const ItemService = [
    { img: Shipping, title: 'Fast Shipping'},
    { img: Guarantee, title: 'Guarantee Fresh'},
    { img: Eco, title: 'Eco Friendly'},
    { img: Secure, title: 'Secure Payment'},
    { img: CustomerService, title: '24/7 Care'}
]

function Service() {
    return (
        <>
            <div className='our-service-section'>
                <div className='our-service-header'>
                    <h1 className='title'>Our Service</h1>
                    <p className='desc'>Your trusted service partner</p>
                </div>
            </div>

            <div className="service-card-section">
                {ItemService.map((service, index) => (
                    <div className="service-card" key={index}>
                        <img src={service.img} alt={service.title} />
                        <h3 className="service-desc">{service.title}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Service;