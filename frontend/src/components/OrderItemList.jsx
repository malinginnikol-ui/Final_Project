import React, { useState, useEffect } from 'react';
import { getOrderItems } from '../api';

const OrderItemList = ({ onRefresh }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrderItems();
    }, [onRefresh]);

    const loadOrderItems = async () => {
        try {
            const data = await getOrderItems();
            if (Array.isArray(data)) {
                setOrderItems(data);
            } else {
                setOrderItems([]);
            }
        } catch (error) {
            console.error('Error fetching order items:', error);
            setOrderItems([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading order items...</p>;

    return (
        <div className="order-item-list">
            <h2>Order Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map(item => (
                        <tr key={item.order_item_id}>
                            <td>{item.order_item_id}</td>
                            <td>{item.order_id}</td>
                            <td>{item.product_name || `Product ID: ${item.product_id}`}</td>
                            <td>{item.quantity}</td>
                            <td>${Number(item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderItemList;
