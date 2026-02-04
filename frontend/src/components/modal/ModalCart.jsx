import { useState } from 'react';
import { AddressInput, MapPreview } from '../../maps/LeafletAddress';

// Import css
import '../../styling/modalcart.css';

function ModalCart({ cartOpen, setCartOpen, cartItems, increaseQty, decreaseQty, removeItem }) {
    const [address, setAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    if (!cartOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
    const grandTotal = subtotal + Number(shippingFee);

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

                {cartItems.map(item => (
                    <div className='cart-row' key={item.id}>
                        <div className='cart-item'>
                            <img src={item.img} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                        
                        <span>${Number(item.price).toFixed(2)}/Kg</span>
                        
                        <div className='qty-control'>
                            <button onClick={() => decreaseQty(item.id)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                        </div>
                        <button className='delete-item' onClick={() => removeItem(item.id)}>
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

                <button className='checkout-btn full'>Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default ModalCart;