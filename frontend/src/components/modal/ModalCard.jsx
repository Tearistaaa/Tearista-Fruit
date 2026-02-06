import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// IMPORT CSS
import '../../styling/modalcard.css';

function ModalCard({ product, onClose }) {
    const { user, addToCart } = useAppContext();
    const navigate = useNavigate();

    if (!product) return null;

    const handleAddToCart = () => {
        if (!user) {
            toast.error('You not login', { duration: 3000 });
            
            setTimeout(() => {
                navigate('/login');
                onClose();
            }, 3000);
            return;
        }

        addToCart(product);
        toast.success(`${product.name} added to cart!`);
        onClose();
    };

    return (
        <div className='product-modal'>
            <div className='product-modal-content horizontal'>
                <button
                    className='modal-close'
                    onClick={onClose}
                >
                    <i className='fa fa-times'></i>
                </button>

                <div className='modal-image'>
                    <img src={product.image_url || product.img} alt={product.name} />
                </div>

                <div className='modal-info'>
                    <span className='modal-category'>Tearista Fruit</span>
                    <h2 className='modal-product-name'>{product.name}</h2>
                    
                    <p className='modal-desc'>{product.description || product.desc}</p>
                    
                    <p className='modal-price'>${product.price}/Kg</p>
                    
                    <button className='add-to-cart' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalCard;