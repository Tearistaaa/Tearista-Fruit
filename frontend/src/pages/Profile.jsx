import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Import Css
import '../styling/profile.css';

function Profile() {
    const { user, logout } = useAppContext();
    const [profileOpen, setProfileOpen] = useState(false);

    if (!user) {
        return (
            <Link to='/login' className='login-button'>
                <i className='fas fa-user-circle'></i>
            </Link>
        );
    }

    return (
        <div className='profile-container'>
            <button
                className='profile-icon'
                onClick={() => setProfileOpen(!profileOpen)}
            >
                <i className='fas fa-user-circle'></i>
            </button>

            {profileOpen && (
                <div className='profile-modal'>
                    <p className='profile-name'>{user.user_metadata?.full_name || 'User'}</p>
                    <p className='profile-email'>{user.email}</p>
                    <button onClick={logout} className='logout-button-modal'>
                        Logout
                    </button>
                    <p className='app-version'>Tearista Fruit v1.0.0</p>
                </div>
            )}
        </div>
    );
}

export default Profile;