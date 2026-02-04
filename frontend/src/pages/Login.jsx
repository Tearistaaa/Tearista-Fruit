import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// Import Css
import '../styling/auth.css';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// Import Supabase
import { supabase } from '../supabaseClient';

const EyeIcon = () => (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
    </svg>
);

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validation
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

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setLoading(true);
            
            const { data, error } = await supabase.auth.signInWithPassword({
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