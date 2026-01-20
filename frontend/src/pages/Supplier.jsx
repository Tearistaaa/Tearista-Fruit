// Import css
import '../global.css';
import '../styling/supplier.css';

// Import Images and dummy data
import IconLogo1 from '../images/supplier/icon-logo-1.webp';
import IconLogo2 from '../images/supplier/icon-logo-2.webp';
import IconLogo3 from '../images/supplier/icon-logo-3.webp';
import IconLogo4 from '../images/supplier/icon-logo-4.webp';
import IconLogo5 from '../images/supplier/icon-logo-5.webp';

const ItemSupplier = [
    { id: 1, src: IconLogo1, alt:'Icon Logo 1'},
    { id: 2, src: IconLogo2, alt:'Icon Logo 2'},
    { id: 3, src: IconLogo3, alt:'Icon Logo 3'},
    { id: 4, src: IconLogo4, alt:'Icon Logo 4'},
    { id: 5, src: IconLogo5, alt:'Icon Logo 5'},
]

function Suppliers() {
    return (
        <>
            <div className='supplier-header'>
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