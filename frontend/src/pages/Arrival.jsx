import { useEffect, useState } from 'react'; // 1. Import Hooks
import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/arrival.css';

// IMPORT MOTION
import MotionCard from '../components/motion-animation/MotionCard.js';
import MotionWrapper from '../components/motion-animation/MotionWrapper.js';

// IMPORT CARD
import Card from '../components/Card.jsx';

function Arrival() {
    const [arrivals, setArrivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/arrivals')
            .then((res) => res.json())
            .then((data) => {
                setArrivals(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil data arrivals:", err);
                setLoading(false);
            });
    }, []);

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
                {loading ? (
                    <p style={{ textAlign: 'center', width: '100%', color: '#666' }}>
                        Loading New Arrivals...
                    </p>
                ) : (
                    // 5. Mapping Data dari Database
                    arrivals.map((arrival) => (
                        <MotionCard key={arrival.id}>
                            <Card
                                item={arrival}
                                name={arrival.name}
                                price={arrival.price}
                            >
                                <Link to='/product'>
                                    <div className='card-image'>
                                        {arrival.label && (
                                            <span className='card-label'>{arrival.label}</span>
                                        )}
                                        
                                        <img src={arrival.image_url} alt={arrival.name} />
                                    </div>
                                </Link>
                            </Card>
                        </MotionCard>
                    ))
                )}
            </div>
        </>
    );
}

export default Arrival;