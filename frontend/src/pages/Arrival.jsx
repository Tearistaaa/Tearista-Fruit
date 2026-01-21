// Import css
import '../global.css';
import '../styling/arrival.css';

// Import Card
import Card from '../components/Card.jsx';

// Import data
import ItemArrival from '../data/ArrivalData.js';

function Arrival() {
    return (
        <>
            <div className='new-arrival-section'>
                <div className='new-arrival-header'>
                    <h1 className='title'>New Arrivals</h1>
                    <p className='desc'>Discover our newest fruits</p>
                </div>
            </div>

            <div className='new-arrival-card-section'>
                {ItemArrival.map((arrival) => (
                    <Card
                        name={arrival.name}
                        price={arrival.price}
                    >
                        <div className='card-image'>
                            <span className='card-label'>{arrival.label}</span>
                            <img src={arrival.img} alt={arrival.name} />
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Arrival;