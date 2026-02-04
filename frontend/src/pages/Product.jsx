import { useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/product.css';

// IMPORT MOTION
import MotionCard from '../components/motion-animation/MotionCard';

// IMPORT CARD
import Card from '../components/Card';

// IMPORT MODAL
import ModalCard from '../components/modal/ModalCard';

// IMPORT DATA
import MotionWrapper from '../components/motion-animation/MotionWrapper';
import ItemProduct from '../data/ProductData';

function Product({limit, showViewMore = false}) {

    // SEARCH HANDLER
    const [searchInput, setSearchInput] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = ItemProduct.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
    };

    const handleSelectSuggestion = (name) => {
        setSearchInput(name);
        setSelectedName(name);
        setSuggestions([]);
    };

    const displayedProducts = selectedName
        ? ItemProduct.filter(p => p.name === selectedName)
        : ItemProduct;

    const visibleProducts = limit
        ? displayedProducts.slice(0, limit)
        : displayedProducts;

    return(
        <>
            <MotionWrapper delay={0}>
                <div className='our-product-section'>
                    <h1 className='title'>Our Product</h1>
                    <p className='desc'>Your daily dose of freshness</p>
                </div>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
                <div className='search-bar-container'>
                    <input
                        type='text'
                        placeholder='Search for a product...'
                        value={searchInput}
                        onChange={handleSearchChange}
                        className='search-bar'
                        autoComplete='off'
                    />

                    {searchInput && (
                        <button
                            className='clear-btn'
                            onClick={() => {
                                setSearchInput('');
                                setSuggestions([]);
                                setSelectedName('');
                            }}
                        >
                            <i className='fa-solid fa-xmark'></i>
                        </button>
                    )}

                    {suggestions.length > 0 ? (
                        <ul className='suggestions-list'>
                            {suggestions.map(item => (
                                <li key={item.name} onClick={() => handleSelectSuggestion(item.name)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchInput && !ItemProduct.some(p => p.name === searchInput) && (
                            <ul className='suggestions-list'>
                                <li className='no-search-results'>
                                    No results for '<strong>{searchInput}</strong>'
                                </li>
                            </ul>
                        )
                    )}
                </div>

                <div className='our-product-card-section'>
                    {visibleProducts.map(ItemProduct => (
                        <MotionCard key={ItemProduct.name}>
                            <Card name={ItemProduct.name} price={ItemProduct.price}>
                                <div
                                    onClick={() => {
                                        setSelectedProduct(ItemProduct);
                                    }}
                                >
                                    <div className='card-image'>
                                        <img src={ItemProduct.img} alt={ItemProduct.name} />
                                    </div>
                                </div>
                            </Card>
                        </MotionCard>
                    ))}

                    {showViewMore && (
                        <div className='view-more-wrapper'>
                            <Link to='/product' className='view-more-btn'>
                                View More <i class="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    )}
                </div>

                <ModalCard
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            </MotionWrapper>
        </>
    );
}

export default Product;