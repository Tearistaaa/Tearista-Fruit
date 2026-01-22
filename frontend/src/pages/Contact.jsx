// Import css
import '../global.css';
import '../styling/contact.css';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

function Contact() {
    return(
        <>
            <div className='contact-section'>
                <MotionWrapper delay={0}>
                    <div className='contact-header-text'>
                        <h1 className='title'>Our Contact</h1>
                        <p className='desc'>Let's get in touch with us</p>
                    </div>
                </MotionWrapper>
            </div>

            <div className='contact-desc'>
                <MotionWrapper delay={0.1}>
                    <div className='contact-desc-detail'>
                        <div className='contact-desc-detail-left'>
                            <p>
                                Feel free to use the form or drop us an email. Old-fashioned phone calls work also.
                            </p>

                            <div className='info-item'>
                                <i className='fa fa-phone'></i>
                                <span>+65123456789</span>
                            </div>

                            <div className='info-item'>
                                <i className='fa fa-envelope'></i>
                                <span>tearistafruit@gmail.com</span>
                            </div>

                            <div className='info-item'>
                                <i className='fas fa-location-dot'></i>
                                <span>902 Jurong West Street 91, Singapore 64902</span>
                            </div>
                        </div>

                        <div className='contact-desc-detail-right'>
                            <form action="">
                                <div className='form-group'>
                                    <label htmlFor='name-input'>Name</label>
                                    <input type='text' className='name-input' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email-input'>Email</label>
                                    <input type='email' className='email-input' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='phone-input'>Phone</label>
                                    <input type='phone' className='phone-input' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='message-input'>Message</label>
                                    <textarea name='message-input' id=''></textarea>
                                </div>

                                <button className='contact-submit-button'>Submit</button>
                            </form>
                        </div>
                    </div>
                </MotionWrapper>
            </div>

            <MotionWrapper delay={0.2}>
                <div className='map-container'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7287282627562!2d103.68398337473795!3d1.3390688986482548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0f9cf609d9c5%3A0x669f46937f3dced0!2sBlk%20902%20Jurong%20West%20St%2091!5e0!3m2!1sen!2sid!4v1768903212679!5m2!1sen!2sid"
                        width="100%"
                        height="600"
                        style={{ border:0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </div>
            </MotionWrapper>
        </>
    );
}

export default Contact;