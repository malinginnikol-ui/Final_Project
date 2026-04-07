import React, { useState, useEffect } from 'react';
import { createPayment, updatePayment } from '../api';

const PaymentForm = ({ onSave, payment, onCancel }) => {
    const [orderId, setOrderId] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('Credit Card');

    useEffect(() => {
        if (payment) {
            setOrderId(payment.order_id || '');
            setAmount(payment.amount || '');
            setMethod(payment.payment_method || 'Credit Card');
        } else {
            setOrderId('');
            setAmount('');
            setMethod('Credit Card');
        }
    }, [payment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { order_id: parseInt(orderId), amount: parseFloat(amount), payment_method: method };
            if (payment) {
                await updatePayment(payment.payment_id, data);
            } else {
                await createPayment(data);
            }
            if (!payment) {
                setOrderId('');
                setAmount('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving payment:', error);
            alert('Error saving payment: ' + error.message);
        }
    };

    return (
        <div className="section">
            <h2>{payment ? 'Edit Payment' : 'Add Payment'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Order ID</label>
                    <input type="number" placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Amount ($)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select value={method} onChange={(e) => setMethod(e.target.value)}>
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button type="submit">{payment ? 'Update Payment' : 'Add Payment'}</button>
                    {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
