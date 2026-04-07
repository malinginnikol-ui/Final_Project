import React, { useState, useEffect } from 'react';
import { getOrders, deleteOrder, getOrderById } from '../api';

const OrderList = ({ onEdit }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getOrders();
            if (Array.isArray(data)) {
                setOrders(data);
            } else if (data && data.error) {
                console.error('Backend error fetching orders:', data.error);
                setOrders([]);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Network error fetching orders:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                loadOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="order-list">
            <h2>Orders</h2>
            <button onClick={() => onEdit(null)}>Create New Order</button>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.customer_name || 'N/A'}</td>
                            <td>{new Date(order.order_date).toLocaleString()}</td>
                            <td>${order.total_amount ? Number(order.total_amount).toFixed(2) : '0.00'}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => onEdit(order)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(order.order_id)}>Delete</button>
                                <button type="button" onClick={() => alertOrderItems(order.order_id)}>View Items</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const alertOrderItems = async (orderId) => {
    try {
        const order = await getOrderById(orderId);
        if (order && order.items) {
            const itemDetails = order.items.map(item => `- ${item.product_name || `Product ID: ${item.product_id}`} x ${item.quantity} ($${Number(item.price).toFixed(2)})`).join('\n');
            alert(`Items for Order #${orderId} (${order.customer_name || 'N/A'}):\n${itemDetails}`);
        }
    } catch (error) {
        console.error('Error fetching order items:', error);
    }
};

export default OrderList;
