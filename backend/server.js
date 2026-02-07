require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ENDPOINT
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/api/arrivals', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
        .limit(8);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/api/blogs', async (req, res) => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Blog not found' });
    
    res.json(data);
});

app.post('/api/orders', async (req, res) => {
    const { email, items, total_price, address, payment_method, shipping_fee } = req.body;

    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                user_email: email,
                items: items,
                total_price: total_price,
                address: address,
                payment_method: payment_method,
                shipping_fee: shipping_fee || 0,
                status: 'Proses'
            }
        ]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Order success', data });
});

app.get('/api/orders/:email', async (req, res) => {
    const { email } = req.params;
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', email)
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});