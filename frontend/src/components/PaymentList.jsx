import React, { useState, useEffect } from 'react';
import { getPayments, deletePayment } from '../api';

const PaymentList = ({ onRefresh, onEdit }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPayments();
    }, [onRefresh]);

    const loadPayments = async () => {
        try {
            const data = await getPayments();
            if (Array.isArray(data)) {
                setPayments(data);
            } else {
                setPayments([]);
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await deletePayment(id);
                loadPayments();
            } catch (error) {
                console.error('Error deleting payment:', error);
                alert('Error deleting payment: ' + error.message);
            }
        }
    };

    if (loading) return <p>Loading payments...</p>;

    return (
        <div className="payment-list">
            <h2>Payments</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.payment_id}>
                            <td>{payment.payment_id}</td>
                            <td>{payment.order_id}</td>
                            <td>${Number(payment.amount).toFixed(2)}</td>
                            <td>{payment.payment_method}</td>
                            <td>{payment.payment_date && !isNaN(new Date(payment.payment_date).getTime()) ? new Date(payment.payment_date).toLocaleString() : 'N/A'}</td>
                            <td>
                                <button onClick={() => onEdit(payment)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(payment.payment_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;
