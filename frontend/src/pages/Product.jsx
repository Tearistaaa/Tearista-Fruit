import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT CSS
import '../global.css';
import '../styling/product.css';

// IMPORT COMPONENTS
import Card from '../components/Card';
import ModalCard from '../components/modal/ModalCard';
import MotionCard from '../components/motion-animation/MotionCard';
import MotionWrapper from '../components/motion-animation/MotionWrapper';

// IMPORT LOADING
import Loading from '../components/Loading';

function Product({ limit, showViewMore = false }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // SEARCH HANDLER
    const [searchInput, setSearchInput] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load products:', err);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = products.filter(p =>
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
        ? products.filter(p => p.name === selectedName)
        : products;

    const visibleProducts = limit
        ? displayedProducts.slice(0, limit)
        : displayedProducts;

    if (loading) {
        return <Loading text='Loading Fresh Products...' />;
    }

    return (
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
                                <li key={item.id} onClick={() => handleSelectSuggestion(item.name)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchInput && !products.some(p => p.name === searchInput) && (
                            <ul className='suggestions-list'>
                                <li className='no-search-results'>
                                    No results for '<strong>{searchInput}</strong>'
                                </li>
                            </ul>
                        )
                    )}
                </div>

                <div className='our-product-card-section'>
                    {visibleProducts.map(item => (
                        <MotionCard key={item.id}>
                            <Card
                                name={item.name} 
                                price={item.price} 
                                img={item.image_url} 
                            >
                                <div
                                    onClick={() => {
                                        setSelectedProduct({
                                            ...item,
                                            img: item.image_url
                                        });
                                    }}
                                >
                                    <div className='card-image'>
                                        <img src={item.image_url} alt={item.name} />
                                    </div>
                                </div>
                            </Card>
                        </MotionCard>
                    ))}

                    {showViewMore && (
                        <div className='view-more-wrapper'>
                            <Link to='/product' className='view-more-btn'>
                                View More <i className='fas fa-arrow-right'></i>
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