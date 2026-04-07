require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Customers CRUD
app.get('/api/customers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customer');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/customers', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const [result] = await db.query('INSERT INTO customer (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
        res.json({ customer_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        await db.query('UPDATE customer SET name = ?, email = ?, phone = ? WHERE customer_id = ?', [name, email, phone, id]);
        res.json({ updated: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM customer WHERE customer_id = ?', [id]);
        res.json({ deleted: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Products CRUD
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM product');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const [result] = await db.query('INSERT INTO product (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock]);
        res.json({ product_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        await db.query('UPDATE product SET name = ?, description = ?, price = ?, stock = ? WHERE product_id = ?', [name, description, price, stock, id]);
        res.json({ updated: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM product WHERE product_id = ?', [id]);
        res.json({ deleted: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Payments CRUD
app.get('/api/payments', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM payment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/payments', async (req, res) => {
    const { order_id, amount, payment_method } = req.body;
    try {
        const [result] = await db.query('INSERT INTO payment (order_id, amount, payment_method) VALUES (?, ?, ?)', [order_id, amount, payment_method]);
        res.json({ payment_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/payments/:id', async (req, res) => {
    const { id } = req.params;
    const { order_id, amount, payment_method } = req.body;
    try {
        await db.query('UPDATE payment SET order_id = ?, amount = ?, payment_method = ? WHERE payment_id = ?', [order_id, amount, payment_method, id]);
        res.json({ updated: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/payments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM payment WHERE payment_id = ?', [id]);
        res.json({ deleted: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Shipments CRUD
app.get('/api/shipments', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM shipment');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/shipments', async (req, res) => {
    const { order_id, shipment_date, delivery_date, status } = req.body;
    try {
        const [result] = await db.query('INSERT INTO shipment (order_id, shipment_date, delivery_date, status) VALUES (?, ?, ?, ?)', [order_id, shipment_date, delivery_date, status]);
        res.json({ shipment_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/shipments/:id', async (req, res) => {
    const { id } = req.params;
    const { order_id, shipment_date, delivery_date, status } = req.body;
    try {
        await db.query('UPDATE shipment SET order_id = ?, shipment_date = ?, delivery_date = ?, status = ? WHERE shipment_id = ?', [order_id, shipment_date, delivery_date, status, id]);
        res.json({ updated: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/shipments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM shipment WHERE shipment_id = ?', [id]);
        res.json({ deleted: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Order Items CRUD
app.get('/api/order-items', async (req, res) => {
    const sql = `
        SELECT oi.*, p.name as product_name 
        FROM order_item oi 
        LEFT JOIN product p ON oi.product_id = p.product_id
    `;
    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders CRUD
app.get('/api/orders', async (req, res) => {
    const sql = `
        SELECT o.*, c.name as customer_name 
        FROM orders o 
        LEFT JOIN customer c ON o.customer_id = c.customer_id
    `;
    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const sqlOrder = `
        SELECT o.*, c.name as customer_name 
        FROM orders o 
        LEFT JOIN customer c ON o.customer_id = c.customer_id
        WHERE o.order_id = ?
    `;
    const sqlItems = `
        SELECT oi.*, p.name as product_name 
        FROM order_item oi 
        LEFT JOIN product p ON oi.product_id = p.product_id
        WHERE oi.order_id = ?
    `;
    try {
        const [rows] = await db.query(sqlOrder, [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        const [items] = await db.query(sqlItems, [id]);
        res.json({ ...rows[0], items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    const { customer_id, items, total_amount, status } = req.body;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const [orderResult] = await connection.query('INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)', [customer_id, total_amount, status || 'pending']);
        const order_id = orderResult.insertId;

        if (items && items.length > 0) {
            for (const item of items) {
                await connection.query('INSERT INTO order_item (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [order_id, item.product_id, item.quantity, item.price]);
                // Decrement stock
                await connection.query('UPDATE product SET stock = stock - ? WHERE product_id = ?', [item.quantity, item.product_id]);
            }
        }
        await connection.commit();
        res.json({ order_id });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

app.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { customer_id, total_amount, status, items } = req.body;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        
        // Update order header
        await connection.query('UPDATE orders SET customer_id = ?, total_amount = ?, status = ? WHERE order_id = ?', [customer_id, total_amount, status, id]);
        
        if (items) {
            // Restore stock for old items
            const [oldItems] = await connection.query('SELECT product_id, quantity FROM order_item WHERE order_id = ?', [id]);
            for (const item of oldItems) {
                await connection.query('UPDATE product SET stock = stock + ? WHERE product_id = ?', [item.quantity, item.product_id]);
            }
            
            // Delete old items
            await connection.query('DELETE FROM order_item WHERE order_id = ?', [id]);
            
            // Insert new items and decrement stock
            for (const item of items) {
                await connection.query('INSERT INTO order_item (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [id, item.product_id, item.quantity, item.price]);
                await connection.query('UPDATE product SET stock = stock - ? WHERE product_id = ?', [item.quantity, item.product_id]);
            }
        }
        
        await connection.commit();
        res.json({ updated: 1 });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        
        // Get items to restore stock
        const [items] = await connection.query('SELECT product_id, quantity FROM order_item WHERE order_id = ?', [id]);
        for (const item of items) {
            await connection.query('UPDATE product SET stock = stock + ? WHERE product_id = ?', [item.quantity, item.product_id]);
        }
        
        // Delete order items first (due to foreign key or just good practice)
        await connection.query('DELETE FROM order_item WHERE order_id = ?', [id]);
        
        // Delete the order
        const [result] = await connection.query('DELETE FROM orders WHERE order_id = ?', [id]);
        
        await connection.commit();
        res.json({ deleted: result.affectedRows });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// Dashboard Stats
app.get('/api/stats', async (req, res) => {
    try {
        const [customerCount] = await db.query('SELECT COUNT(*) as count FROM customer');
        const [productCount] = await db.query('SELECT COUNT(*) as count FROM product');
        const [orderCount] = await db.query('SELECT COUNT(*) as count FROM orders');
        
        res.json({
            customers: customerCount[0].count,
            products: productCount[0].count,
            orders: orderCount[0].count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
