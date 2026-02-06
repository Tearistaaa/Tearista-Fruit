import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MotionWrapper from '../components/motion-animation/MotionWrapper';
import { supabase } from '../supabaseClient';

// IMPORT CSS
import '../styling/auth.css';

// IMPORT ICONS (Tambahkan ini)
import { EyeIcon, EyeSlashIcon } from '../components/icons/AuthIcons';

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                toast.error('Reset Link is invalid');
                navigate('/login');
            }
        });
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!password) return toast.error('Enter your new password');
        
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password: password });
        setLoading(false);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Password successful change. Please login!');
            navigate('/login');
        }
    };

    return (
        <MotionWrapper type='banner'>
            <div className='auth-container'>
                <div className='auth-box'>
                    <h2 className='auth-title'>Set New Password</h2>
                    <p className='auth-subtitle'>Enter your new password below.</p>
                    
                    <form className='auth-form' onSubmit={handleUpdate}>
                        
                        <div className='password-input-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='New Password'
                                className='auth-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <button
                                type='button'
                                className='password-toggle-icon'
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        <button type='submit' className='auth-button' disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </MotionWrapper>
    );
}

export default UpdatePassword;