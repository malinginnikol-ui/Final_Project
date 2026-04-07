import React, { useState, useEffect } from 'react';
import { getCustomers, getProducts, getOrderById, createOrder, updateOrder } from '../api';

const OrderForm = ({ order, onSave, onCancel }) => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [customerId, setCustomerId] = useState(order ? order.customer_id : '');
    const [status, setStatus] = useState(order ? order.status : 'pending');
    const [totalAmount, setTotalAmount] = useState(order ? order.total_amount : 0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customersData, productsData] = await Promise.all([getCustomers(), getProducts()]);
                setCustomers(Array.isArray(customersData) ? customersData : []);
                setProducts(Array.isArray(productsData) ? productsData : []);

                if (order && order.order_id) {
                    const fullOrder = await getOrderById(order.order_id);
                    if (fullOrder && fullOrder.items) {
                        setItems(fullOrder.items);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [order]);

    const addItem = () => {
        if (products.length === 0) {
            alert('Please add products first');
            return;
        }
        setItems([...items, { product_id: products[0].product_id, quantity: 1, price: products[0].price }]);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        if (field === 'product_id') {
            const product = products.find(p => p.product_id === parseInt(value));
            if (product) newItems[index].price = product.price;
        }
        setItems(newItems);
        
        const total = newItems.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);
        setTotalAmount(total.toFixed(2));
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        const total = newItems.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);
        setTotalAmount(total.toFixed(2));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            customer_id: customerId,
            status: status,
            total_amount: parseFloat(totalAmount),
            items: items.map(item => ({
                product_id: parseInt(item.product_id),
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price)
            }))
        };

        if (items.length === 0) {
            alert('Please add at least one item to the order');
            return;
        }

        try {
            if (order) {
                await updateOrder(order.order_id, orderData);
                alert('Order updated successfully');
            } else {
                await createOrder(orderData);
                alert('Order created successfully');
            }
            onSave();
        } catch (error) {
            console.error('Error saving order:', error);
            alert(`Error saving order: ${error.message || 'Something went wrong'}`);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="section">
            <h2>{order ? 'Edit Order' : 'Create New Order'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer.customer_id} value={customer.customer_id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="items-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Order Items</h3>
                    {items.map((item, index) => (
                        <div key={index} className="item-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <select value={item.product_id} onChange={(e) => updateItem(index, 'product_id', e.target.value)} required>
                                <option value="">Select product</option>
                                {products.map(p => <option key={p.product_id} value={p.product_id}>{p.name} (${p.price})</option>)}
                            </select>
                            <input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} min="1" placeholder="Qty" required />
                            <span style={{ fontWeight: 500 }}>${item.price}</span>
                            <button type="button" onClick={() => removeItem(index)} style={{ padding: '5px 10px', backgroundColor: '#ef4444' }}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} style={{ backgroundColor: 'var(--text-secondary)', marginTop: '5px' }}>+ Add Item</button>
                </div>

                <div className="form-group">
                    <label>Order Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Total Amount ($)</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        value={totalAmount} 
                        onChange={(e) => setTotalAmount(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit">Save Order</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
