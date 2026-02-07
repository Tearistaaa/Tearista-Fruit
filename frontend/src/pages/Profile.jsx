import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// IMPORT CSS
import '../styling/profile.css';

const OrderTimer = ({ createdAt, onExpired }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const orderTime = new Date(createdAt).getTime();
            const arrivalTime = orderTime + (20 * 60 * 1000);
            const now = new Date().getTime();
            const distance = arrivalTime - now;

            if (distance < 0) {
                clearInterval(interval);
                onExpired();
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [createdAt, onExpired]);

    return <span className='timer-text'>{timeLeft}</span>;
};

function Profile({ isMobile, closeMenu }) {
    const { user, logout, isProfileOpen, setIsProfileOpen } = useAppContext();
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && isProfileOpen) {
            fetch(`http://localhost:5000/api/orders/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const activeOrders = data.filter(order => {
                        const orderTime = new Date(order.created_at).getTime();
                        return (new Date().getTime() - orderTime) < (20 * 60 * 1000);
                    });
                    setOrders(activeOrders);
                })
                .catch(err => console.error('Failed to get Order:', err));
        }
    }, [user, isProfileOpen]);

    const handleOrderExpired = (orderId) => {
        setOrders(prev => prev.filter(o => o.id !== orderId));
    };

    if (!user) {
        return (
            <Link
                to='/login'
                className='login-button'
                onClick={isMobile ? closeMenu : undefined}
            >
                <i className='fas fa-user-circle'></i>
                {isMobile && <span>Login</span>}
            </Link>
        );
    }
    
    const handleOpenProfile = (e) => {
        if (e) e.preventDefault();
        setIsProfileOpen(true);
    };

    return (
        <>
            {isMobile ? (
                <button
                    className='login-button mobile-profile-btn'
                    onClick={handleOpenProfile}
                >
                    <i className='fas fa-user-circle'></i>
                    <span>Profile</span>
                </button>
            ) : (
                <div className='profile-trigger'>
                    <button
                        className='profile-icon'
                        onClick={() => setIsProfileOpen(true)}
                    >
                        <i className='fas fa-user-circle'></i>
                    </button>
                </div>
            )}

            <ProfileModal
                user={user}
                logout={logout}
                isOpen={isProfileOpen}
                setIsOpen={setIsProfileOpen}
                orders={orders}
                handleOrderExpired={handleOrderExpired}
            />
        </>
    );
}

function ProfileModal({ user, logout, isOpen, setIsOpen, orders, handleOrderExpired }) {
    if (!isOpen) return null;

    return createPortal(
        <div className='profile-overlay' onClick={() => setIsOpen(false)}>
            <div className='profile-modal-centered' onClick={(e) => e.stopPropagation()}>
                
                <button className='modal-close-btn' onClick={() => setIsOpen(false)}>
                    <i className='fas fa-times'></i>
                </button>

                <div className='profile-content'>
                    <div className='profile-header-section'>
                        <div className='profile-avatar'>
                            <i className='fas fa-user-circle'></i>
                        </div>
                        <h3 className='profile-name'>{user.user_metadata?.full_name || 'User'}</h3>
                        <p className='profile-email'>{user.email}</p>
                    </div>

                    <div className='order-history-section'>
                        <h4>Active Orders</h4>
                        
                        <div className='order-list-container'>
                            {orders.length === 0 ? (
                                <div className='no-order-state'>
                                    <i className='fas fa-box-open'></i>
                                    <p>No active orders right now.</p>
                                </div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className='order-card'>
                                        <div className='order-card-top'>
                                            <span className='order-id'>Order #{order.id}</span>
                                            <OrderTimer
                                                createdAt={order.created_at}
                                                onExpired={() => handleOrderExpired(order.id)} 
                                            />
                                        </div>
                                        
                                        <div className='order-card-body'>
                                            <div className='order-info-row'>
                                                <i className='fas fa-map-marker-alt'></i>
                                                <span>{order.address}</span>
                                            </div>
                                            <div className='order-info-row'>
                                                <i className='fas fa-wallet'></i>
                                                <span>{order.payment_method}</span>
                                            </div>
                                            
                                            <div className='order-items-preview'>
                                                {order.items.map((item, idx) => (
                                                    <span key={idx} className='mini-item-pill'>
                                                        {item.qty}x {item.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='order-card-footer'>
                                            <span className='order-total'>Total:</span>
                                            <span className='total-price'>${Number(order.total_price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <button onClick={() => { logout(); setIsOpen(false); }} className='logout-button-modal'>
                        Logout
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Profile;