// Import css
import '../global.css';
import '../styling/supplier.css';

// Import data
import ItemSupplier from '../data/SupplierData';

function Suppliers() {
    return (
        <>
            <div className='supplier-section'>
                <div className='supplier-text'>
                    <h1 className='title'>Our Supplier</h1>
                    <p className='desc'>Working with reliable suppliers to ensure the best quality</p>
                </div>

                <div className='supplier-card-container'>
                    {ItemSupplier.map((supplier, index) => (
                        <div className='supplier-card'>
                            <img src={supplier.src} alt={supplier.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Suppliers;