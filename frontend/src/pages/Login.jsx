import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// IMPORT CSS
import '../styling/auth.css';

// IMPORT MOTION
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// IMPORT SUPABASE
import { supabase } from '../supabaseClient';

// IMPORT ICONS
import { EyeIcon, EyeSlashIcon } from '../components/icons/AuthIcons';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // HANDLE CHANGE
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // HANDLE VALIDATION
    const validateForm = () => {
        const { email, password } = formData;
        
        if (!email || !password) {
            toast.error('Email and Password are required!');
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address!');
            return false;
        }

        return true;
    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setLoading(true);
            
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            setLoading(false);

            if (error) {
                toast.error(error.message || 'Invalid email or password.');
            } else {
                toast.success('Login successful! Welcome back.');
                navigate('/');
            }
        }
    };

    return (
        <MotionWrapper type='banner'>
            <div className='auth-container'>
                <div className='auth-box'>
                    <h2 className='auth-title'>Welcome Back</h2>
                    <p className='auth-subtitle'>Please enter your details to sign in.</p>
                    
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email Address'
                            className='auth-input'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        
                        <div className='password-input-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'} 
                                name='password'
                                placeholder='Password'
                                className='auth-input'
                                value={formData.password}
                                onChange={handleChange}
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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className='auth-footer'>
                        Don't have an account?
                        <Link to='/signup' className='auth-link'>Sign up</Link>
                    </p>
                </div>
            </div>
        </MotionWrapper>
    );
}

export default Login;