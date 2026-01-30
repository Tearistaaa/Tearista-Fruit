// Import css
import '../../styling/modalcard.css';

function ModalCard({ product, onClose }) {
    if (!product) return null;

    return (
        <div className='product-modal'>
            <div className='product-modal-content horizontal'>
                <button
                    className='modal-close'
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className='modal-image'>
                    <img src={product.img} alt={product.name} />
                </div>

                <div className='modal-info'>
                    <span className='modal-category'>Tearista Fruit</span>
                    <h2 className='modal-product-name'>{product.name}</h2>
                    <p className='modal-desc'>{product.desc}</p>
                    <p className='modal-price'>{product.price}</p>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ModalCard;