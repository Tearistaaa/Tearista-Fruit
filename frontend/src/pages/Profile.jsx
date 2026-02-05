import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import '../styling/profile.css';

function Profile({ isMobile, closeMenu }) {
    const { user, logout } = useAppContext();
    const [profileOpen, setProfileOpen] = useState(false);

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
    
    // MOBILE
    if (isMobile) {
        return (
            <>
                <button
                    className='login-button'
                    style={{ cursor: 'pointer', color: '#f5e07a' }}
                    onClick={(e) => {
                        e.preventDefault();
                        setProfileOpen(true);
                    }}
                >
                    <i className='fas fa-user-circle'></i>
                    <span>Profile</span>
                </button>

                <ProfileModal
                    user={user}
                    logout={logout}
                    isOpen={profileOpen}
                    setIsOpen={setProfileOpen}
                />
            </>
        );
    }

    // DESKTOP
    return (
        <>
            <div className='profile-trigger'>
                <button
                    className='profile-icon'
                    onClick={() => setProfileOpen(true)}
                >
                    <i className='fas fa-user-circle'></i>
                </button>
            </div>

            <ProfileModal
                user={user}
                logout={logout}
                isOpen={profileOpen}
                setIsOpen={setProfileOpen}
            />
        </>
    );
}

function ProfileModal({ user, logout, isOpen, setIsOpen }) {
    if (!isOpen) return null;

    return createPortal(
        <div className='profile-overlay' onClick={() => setIsOpen(false)}>
            <div className='profile-modal-centered' onClick={(e) => e.stopPropagation()}>
                
                <button className='modal-close-btn' onClick={() => setIsOpen(false)}>
                    <i className='fas fa-times'></i>
                </button>

                <div className='profile-content'>
                    <div className='profile-avatar'>
                        <i className='fas fa-user-circle'></i>
                    </div>

                    <h3 className='profile-name'>{user.user_metadata?.full_name || 'User'}</h3>
                    <p className='profile-email'>{user.email}</p>

                    <button onClick={() => { logout(); setIsOpen(false); }} className='logout-button-modal'>
                        Logout
                    </button>
                    <p className='app-version'>Tearista Fruit v1.0.0</p>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Profile;