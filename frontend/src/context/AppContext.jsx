import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// IMPORT PRODUCT
import ItemProduct from '../data/ProductData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchCart(session.user.id);
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
    }, []);

    const fetchCart = async (userId) => {
        setLoadingCart(true);
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching cart:', error);
        } else if (data) {
            const mergedCart = data.map(item => {
                const productDetails = ItemProduct.find(p => p.id === item.product_id);
                
                if (!productDetails) return null;

                return {
                    ...productDetails,
                    qty: item.quantity,
                    db_id: item.id
                };
            }).filter(item => item !== null);
            
            setCartItems(mergedCart);
        }
        setLoadingCart(false);
    };

    const addToCart = async (product) => {
        let newQty = 1;
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                newQty = existing.qty + 1;
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });

        if (user) {
            const currentItem = cartItems.find(item => item.id === product.id);
            const qtyToSave = currentItem ? currentItem.qty + 1 : 1;

            const { error } = await supabase
                .from('cart_items')
                .upsert({
                    user_id: user.id,
                    product_id: product.id,
                    quantity: qtyToSave
                }, { onConflict: 'user_id, product_id' });

            if (error) console.error("Failed to update cart in the database:", error);
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

            if (error) console.error("Failed to update cart in the database:", error);
        }
    };

    const decreaseQty = async (product) => {
        if (product.qty === 1) {
            removeFromCart(product.id);
            return;
        }

        setCartItems(prev => prev.map(item => 
            item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        ));

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: product.qty - 1 })
                .eq('user_id', user.id)
                .eq('product_id', product.id);
            
            if (error) console.error("Unable to decrease item quantity:", error);
        }
    };

    const checkout = async () => {
        if (!user) return;

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);

        if (error) {
            console.error('Failed to checkout :', error);
            return false
        } else {
            setCartItems([]);
            return true;
        }
    }

    const logout = async () => {
        await supabase.auth.signOut();
        setCartItems([]);
    };

    return (
        <AppContext.Provider value={{ user, cartItems, setCartItems, addToCart, removeFromCart, decreaseQty, logout, loadingCart, checkout }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);