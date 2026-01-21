// Import css
import '../styling/product.css';

// Import pages
import Product from '../pages/Product.jsx';

function ProductPage() {
    return (
        <>
            <div style={{ paddingTop: '100px' }}>
                <Product />
            </div>
        </>
    )
}

export default ProductPage;