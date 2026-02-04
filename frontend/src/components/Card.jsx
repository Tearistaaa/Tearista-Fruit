// IMPORT CSS
import '../styling/card.css';

function Card({ label, img, name, price, children }) {
    return (
        <div className='card-header'>
            {children}
            <h3 className='card-name'>{name}</h3>
            <p className='card-price'>${Number(price).toFixed(2)}/Kg</p>
        </div>
    );
}

export default Card;