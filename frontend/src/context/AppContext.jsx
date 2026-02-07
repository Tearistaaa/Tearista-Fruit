import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const fetchCart = useCallback(async (userId) => {
        setLoadingCart(true);
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                quantity,
                product_id,
                products (
                    id,
                    name,
                    price,
                    image_url,
                    description
                )
            `)
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching cart:', error);
        } else if (data) {
            const formattedCart = data.map(item => {
                const product = item.products;
                if (!product) return null;

                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.image_url,
                    description: product.description,
                    qty: item.quantity,
                    db_cart_id: item.id
                };
            }).filter(item => item !== null);
            
            setCartItems(formattedCart);
        }
        setLoadingCart(false);
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) fetchCart(currentUser.id);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchCart(currentUser.id);
            } else {
                setCartItems([]);
            }
        });

        return () => subscription.unsubscribe();
    }, [fetchCart]);

    const addToCart = async (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        const newQty = existingItem ? existingItem.qty + 1 : 1;
        const productImg = product.img || product.image_url;

        setCartItems(prev => {
            if (existingItem) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, qty: newQty } : item
                );
            }
            return [...prev, { ...product, img: productImg, qty: 1 }];
        });

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .upsert({
                    user_id: user.id,
                    product_id: product.id,
                    quantity: newQty
                }, { onConflict: 'user_id, product_id' });
                
            if (error) console.error('Failed to update cart to DB:', error);
        }
    };

    const decreaseQty = async (product) => {
        if (product.qty <= 1) {
            removeFromCart(product.id);
            return;
        }

        const newQty = product.qty - 1;

        setCartItems(prev => prev.map(item => 
            item.id === product.id ? { ...item, qty: newQty } : item
        ));

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQty })
                .eq('user_id', user.id)
                .eq('product_id', product.id);
            
            if (error) console.error('Unable to decrease item quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        setCartItems(items => items.filter(item => item.id !== productId));

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (error) console.error('Failed to remove cart item:', error);
        }
    };

    const checkout = async (orderData) => {
        if (!user) return false;

        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const total = subtotal + (orderData?.shippingFee || 0);

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    items: cartItems,
                    total_price: total,
                    address: orderData.address,
                    payment_method: orderData.paymentMethod,
                    shipping_fee: orderData.shippingFee
                })
            });

            if (response.ok) {
                const { error } = await supabase
                    .from('cart_items')
                    .delete()
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Failed to clear cart DB:', error);
                } else {
                    setCartItems([]);
                    return true;
                }
            } else {
                console.error('Server failed to save order');
                return false;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            return false;
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setCartItems([]);
        setUser(null);
    };

    return (
        <AppContext.Provider value={{
            user,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            decreaseQty,
            logout,
            loadingCart,
            checkout,
            isProfileOpen,
            setIsProfileOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);