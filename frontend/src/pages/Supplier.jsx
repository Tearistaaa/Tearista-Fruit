// Import css
import '../global.css';
import '../styling/supplier.css';

// Import Motion
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// Import data
import ItemSupplier from '../data/SupplierData';

function Suppliers() {
    return (
        <>
            <div className='supplier-section'>
                <MotionWrapper delay={0}>
                    <div className='supplier-text'>
                        <h1 className='title'>Our Supplier</h1>
                        <p className='desc'>Working with reliable suppliers to ensure the best quality</p>
                    </div>
                </MotionWrapper>

                <div className='supplier-card-container'>
                    {ItemSupplier.map((supplier, index) => (
                        <MotionWrapper
                            key={supplier.id}
                            delay={index * 0.1}
                            whileHover= {{ scale: 1.1 }}
                        >
                            <div className='supplier-card'>
                                <img src={supplier.src} alt={supplier.alt} />
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Suppliers;