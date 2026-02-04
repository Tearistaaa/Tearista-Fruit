import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { AddressInput, MapPreview } from '../../maps/LeafletAddress';

// IMPORT CSS
import '../../styling/modalcart.css';

function ModalCart({ cartOpen, setCartOpen }) {
    const navigate = useNavigate();
    const { cartItems, addToCart, decreaseQty, removeFromCart, checkout } = useAppContext();

    const [address, setAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    if (!cartOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
    const grandTotal = subtotal + Number(shippingFee);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error(`Your cart still empty!`);
            return;
        }

        if (!address) {
            toast.error(`Please fill in the shipping address first.`);
            return;
        }

        const isSuccess = await checkout();

        if (isSuccess) {
            toast.success(`Checkout successful! Thank you for your purchase.`, {duration: 3000 });

            setAddress('');
            setCoordinates({ lat: null, lng: null });
            setShippingFee(0);
            setCartOpen(false);
            navigate('/product');
        } else {
            toast.error(`Sorry, an error occurred during the checkout process. Please try again.`);
        }

        await checkout();
        setCartOpen(false);
    };

    return (
        <div className='cart-modal-overlay' onClick={() => setCartOpen(false)}>
            <div className='cart-modal cart-large' onClick={(e) => e.stopPropagation()}>
                <div className='cart-modal-header'>
                    <h2>My Cart ({cartItems.length} items)</h2>
                    <button className='close-btn' onClick={() => setCartOpen(false)}>
                        &times;
                    </button>
                </div>

                <div className='cart-table-header'>
                    <span>Items</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Action</span>
                </div>

                {cartItems.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        Cart is empty. Let's go shopping!
                    </div>
                )}

                {cartItems.map(item => (
                    <div className='cart-row' key={item.id}>
                        <div className='cart-item'>
                            <img src={item.img} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                        
                        <span>${Number(item.price).toFixed(2)}/Kg</span>
                        
                        <div className='qty-control'>
                            <button onClick={() => decreaseQty(item)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => addToCart(item)}>+</button>
                        </div>
                        <button className='delete-item' onClick={() => removeFromCart(item.id)}>
                            <i className='fas fa-trash'></i>
                        </button>
                    </div>
                ))}

                <div className='delivery-section'>
                    <h3>Delivery Address</h3>

                    <AddressInput
                        setAddress={setAddress}
                        setCoordinates={setCoordinates}
                        setShippingFee={setShippingFee}
                    />

                    <MapPreview coordinates={coordinates} />
                    
                    {address && <p className='address-preview'>{address}</p>}
                    {shippingFee > 0 && <p>Shipping Fee: ${Number(shippingFee).toFixed(2)}</p>}
                </div>

                <div className='cart-summary'>
                    <div className='sub-total'>
                        <span>Sub Total : </span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='fee-shipping'>
                        <span>Shipping Fee : </span>
                        <span>${Number(shippingFee).toFixed(2)}</span>
                    </div>
                    <div className='grand-total'>
                        <span>Grand Total : </span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className='checkout-btn full'
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default ModalCart;