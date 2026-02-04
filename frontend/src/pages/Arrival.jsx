import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/arrival.css';

// IMPORT MOTION
import MotionCard from '../components/motion-animation/MotionCard.js';
import MotionWrapper from '../components/motion-animation/MotionWrapper.js';

// IMPORT CARD
import Card from '../components/Card.jsx';

// IMPORT DATA
import ItemArrival from '../data/ArrivalData.js';

function Arrival() {
    return (
        <>
            <div className='new-arrival-section'>
                <MotionWrapper delay={0}>
                    <div className='new-arrival-header'>
                        <h1 className='title'>New Arrivals</h1>
                        <p className='desc'>Discover our newest fruits</p>
                </div>
                </MotionWrapper>
            </div>

            <div className='new-arrival-card-section'>
                {ItemArrival.map((arrival) => (
                    <MotionCard key={arrival.name}>
                        <Card
                            name={arrival.name}
                            price={arrival.price}
                        >
                            <Link to ='/product'>
                                <div className='card-image'>
                                    <span className='card-label'>{arrival.label}</span>
                                    <img src={arrival.img} alt={arrival.name} />
                                </div>
                            </Link>
                        </Card>
                    </MotionCard>
                ))}
            </div>
        </>
    );
}

export default Arrival;