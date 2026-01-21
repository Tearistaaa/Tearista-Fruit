// Import css
import '../global.css';
import '../styling/product.css';

// Import card
import Card from '../components/Card';

// Import data
import ItemProduct from '../data/ProductData';

function Product() {
    return(
        <>
            <div className='our-product-section'>
                <h1 className='title'>Our Product</h1>
                <p className='desc'>Your daily dose of freshness</p>
            </div>

            <div className='search-bar-container'>
                <input
                    type='text'
                    placeholder='Search for a product...'
                    value=''
                    onChange={''}
                    className='search-bar'
                    autoComplete='off'
                >
                </input>
            </div>

            <div className='our-product-card-section'>
                {ItemProduct.map(product => (
                    <Card name={product.name} price={product.price}>
                        <div>
                            <div className='card-image'>
                                <img src={product.img} alt={product.name} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Product;