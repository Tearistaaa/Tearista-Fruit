// Import css
import '../global.css';
import '../styling/service.css';

//Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// Import data
import ItemService from '../data/ServiceData';

function Service() {
    return (
        <>
            <MotionWrapper delay={0}>
                <div className='our-service-section'>
                    <div className='our-service-header'>
                        <h1 className='title'>Our Service</h1>
                        <p className='desc'>Your trusted service partner</p>
                    </div>
                </div>
            </MotionWrapper>

            <div className="service-card-section">
                {ItemService.map((service, index) => (
                    <MotionWrapper key={index} delay={0}>
                        <div className="service-card" key={index}>
                            <img src={service.img} alt={service.title} />
                            <h3 className="service-desc">{service.title}</h3>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </>
    );
}

export default Service;