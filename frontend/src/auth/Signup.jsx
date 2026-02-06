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

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName.trim()) {
            toast.error('Full Name is required!');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address!');
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long and contain at least one letter and one number.');
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password do not match!');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setLoading(true);
            
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                },
            });

            setLoading(false);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Registration successful! Please login.');
                navigate('/login');
            }
        }
    };

    return (
        <MotionWrapper type='banner'>
            <div className='auth-container'>
                <div className='auth-box'>
                    <h2 className='auth-title'>Create Account</h2>
                    <p className='auth-subtitle'>Join us and start your healthy journey.</p>
                    
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='fullName'
                            placeholder='Full Name'
                            className='auth-input'
                            value={formData.fullName}
                            onChange={handleChange}
                        />
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
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        <div className='password-input-wrapper'>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                className='auth-input'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type='button'
                                className='password-toggle-icon'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        <button type='submit' className='auth-button' disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className='auth-footer'>
                        Already have an account?
                        <Link to='/login' className='auth-link'>Sign in</Link>
                    </p>
                </div>
            </div>
        </MotionWrapper>
    );
}

export default Signup;