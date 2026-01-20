import Card from '../components/Card.jsx';
import '../global.css';
import '../styling/arrival.css';

// Import image and dummy data
import Apple from '../images/fruit-image/apple.webp';
import Banana from '../images/fruit-image/banana.webp';
import Durian from '../images/fruit-image/durian.webp';
import Grape from '../images/fruit-image/grape.webp';
import Kurma from '../images/fruit-image/kurma.webp';
import Mango from '../images/fruit-image/mango.webp';
import Pear from '../images/fruit-image/pear.webp';
import Watermelon from '../images/fruit-image/watermelon.webp';

const ItemArrival = [
  { name: 'Kurma', price: '$12.70/Kg', img: Kurma, label: 'New' },
  { name: 'Pear', price: '$12.70/Kg', img: Pear, label: 'New' },
  { name: 'Apple', price: '$15.70/Kg', img: Apple, label: 'New' },
  { name: 'Grape', price: '$9.55/Kg', img: Grape, label: 'New' },
  { name: 'Mango', price: '$5.99/Kg', img: Mango, label: 'New' },
  { name: 'Durian', price: '$6.99/Kg', img: Durian, label: 'New' },
  { name: 'Watermelon', price: '$7.99/Kg', img: Watermelon, label: 'New' },
  { name: 'Banana', price: '$12.99/Kg', img: Banana, label: 'New' },
];

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