import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { AddressInput, MapPreview } from '../../maps/LeafletAddress';

// IMPORT CSS
import '../../styling/modalcart.css';

// IMPORT DATA
import paymentMethods from '../../data/PaymentData';

function ModalCart({ cartOpen, setCartOpen }) {
    const navigate = useNavigate();
    const { cartItems, addToCart, decreaseQty, removeFromCart, checkout } = useAppContext();

    const [address, setAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentProof, setPaymentProof] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    if (!cartOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
    const grandTotal = subtotal + Number(shippingFee);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaymentProof(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return toast.error(`Your cart is empty!`);
        if (!address) return toast.error(`Please fill in the shipping address.`);
        
        if (!selectedPayment) return toast.error('Please select a payment method!');
        if (!paymentProof) return toast.error('Please upload the payment proof screenshot!');

        const isSuccess = await checkout();

        if (isSuccess) {
            const method = paymentMethods.find(p => p.id === selectedPayment);
            toast.success(`Checkout via ${method.name} successful!`, { duration: 3000 });

            setAddress('');
            setCoordinates({ lat: null, lng: null });
            setShippingFee(0);
            setSelectedPayment(null);
            setPaymentProof(null);
            setPreviewImage(null);
            setCartOpen(false);
            navigate('/product');
        } else {
            toast.error(`Checkout failed. Please try again.`);
        }
    };

    const activeMethod = paymentMethods.find(p => p.id === selectedPayment);

    return (
        <div className='cart-modal-overlay' onClick={() => setCartOpen(false)}>
            <div className='cart-modal cart-large' onClick={(e) => e.stopPropagation()}>
                
                <div className='cart-modal-header'>
                    <h2>My Cart ({cartItems.length})</h2>
                    <button className='close-btn' onClick={() => setCartOpen(false)}>&times;</button>
                </div>

                <div className='cart-table-header'>
                    <span>Items</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Action</span>
                </div>

                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div className='cart-row' key={item.id}>
                            <div className='cart-item'>
                                <img src={item.img} alt={item.name} />
                                <span>{item.name}</span>
                            </div>
                            <span>${Number(item.price).toFixed(2)}</span>
                            <div className='qty-control'>
                                <button onClick={() => decreaseQty(item)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => addToCart(item)}>+</button>
                            </div>
                            <button className='delete-item' onClick={() => removeFromCart(item.id)}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='empty-msg'>Cart is empty.</div>
                )}

                <div className='delivery-section'>
                    <h3>Delivery Address</h3>
                    <AddressInput setAddress={setAddress} setCoordinates={setCoordinates} setShippingFee={setShippingFee} />
                    <MapPreview coordinates={coordinates} />
                    
                    {address && <p className='address-preview'>{address}</p>}
                    
                    {shippingFee > 0 && (
                        <p className='shipping-fee-text'>
                            Shipping Fee: ${Number(shippingFee).toFixed(2)}
                        </p>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className='payment-section'>
                        <h3>Payment Method</h3>

                        <div className='custom-dropdown'>
                            <div 
                                className={`dropdown-header ${isDropdownOpen ? 'open' : ''}`} 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {selectedPayment ? (
                                    <div className='selected-value'>
                                        <img src={activeMethod.img} alt={activeMethod.name} />
                                        <span>{activeMethod.name}</span>
                                    </div>
                                ) : (
                                    <span>Select a Payment Method...</span>
                                )}
                                <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
                            </div>

                            {isDropdownOpen && (
                                <div className='dropdown-options'>
                                    {paymentMethods.map((method) => (
                                        <div 
                                            key={method.id} 
                                            className='dropdown-item'
                                            onClick={() => {
                                                setSelectedPayment(method.id);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <img src={method.img} alt={method.name} />
                                            <span>{method.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedPayment && (
                            <div className='payment-detail-container'>
                                <div className='payment-info-box'>
                                    <p>Please transfer to:</p>
                                    <div className='account-number-box'>
                                        <span className='acc-text'>{activeMethod.details}</span>
                                        <button className='copy-btn' onClick={() => {
                                            navigator.clipboard.writeText(activeMethod.details);
                                            toast.success('Copy!');
                                        }}>
                                            <i className='fas fa-copy'></i>
                                        </button>
                                    </div>
                                </div>

                                <div className='upload-proof-section'>
                                    <label>Upload Proof of Payment:</label>
                                    <div className='file-input-wrapper'>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            onChange={handleFileChange}
                                        />
                                        <div className='file-visual'>
                                            <i className='fas fa-cloud-upload-alt'></i>
                                            <span>{paymentProof ? paymentProof.name : 'Click to upload screenshoot'}</span>
                                        </div>
                                    </div>

                                    {previewImage && (
                                        <div className='proof-preview'>
                                            <img src={previewImage} alt='Transfer Proof' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className='cart-summary'>
                    <div><span>Sub Total:</span> <span>${subtotal.toFixed(2)}</span></div>
                    <div><span>Shipping:</span> <span>${Number(shippingFee).toFixed(2)}</span></div>
                    <div className='grand-total'><span>Total:</span> <span>${grandTotal.toFixed(2)}</span></div>
                </div>

                <button className='checkout-btn full' onClick={handleCheckout}>
                    Proceed to Order
                </button>
            </div>
        </div>
    );
}

export default ModalCart;