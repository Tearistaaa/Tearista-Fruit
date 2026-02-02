import { useState } from 'react';
import { Link } from 'react-router-dom';
import MotionWrapper from '../components/motion-animation/MotionWrapper';
import '../styling/auth.css';

// Ikon Mata (Show)
const EyeIcon = () => (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
    </svg>
);

// Ikon Mata Coret (Hide)
const EyeSlashIcon = () => (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
    </svg>
);

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            alert('Full Name is required!');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one letter and one number.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match!');
            return false;
        }

        return true;
    };

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Registration Success:', formData);
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

                        <button type='submit' className='auth-button'>Sign Up</button>
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