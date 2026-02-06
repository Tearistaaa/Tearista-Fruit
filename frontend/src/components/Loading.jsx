// IMPORT CSS
import '../styling/loading.css';

const Loading = ({ text = 'Loading...' }) => {
    return (
        <div className='loading-container'>
            <i className='fas fa-spinner fa-spin loading-icon'></i>
            <p className='loading-text'>{text}</p>
        </div>
    );
};

export default Loading;