// Import css
import '../global.css';
import '../styling/product.css';

// Import Motion
import MotionCard from '../components/motion-animation/MotionCard';

// Import card
import Card from '../components/Card';

// Import data
import MotionWrapper from '../components/motion-animation/MotionWrapper';
import ItemProduct from '../data/ProductData';

function Product() {
    return(
        <>
            <MotionWrapper delay={0}>
                <div className='our-product-section'>
                    <h1 className='title'>Our Product</h1>
                    <p className='desc'>Your daily dose of freshness</p>
                </div>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
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
            </MotionWrapper>

            <div className='our-product-card-section'>
                {ItemProduct.map(product => (
                    <MotionCard key={product.name}>
                        <Card name={product.name} price={product.price}>
                            <div>
                                <div className='card-image'>
                                    <img src={product.img} alt={product.name} />
                                </div>
                            </div>
                        </Card>
                    </MotionCard>
                ))}
            </div>
        </>
    );
}

export default Product;