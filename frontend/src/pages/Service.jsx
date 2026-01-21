// Import css
import '../global.css';
import '../styling/service.css';

// Import data
import ItemService from '../data/ServiceData';

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