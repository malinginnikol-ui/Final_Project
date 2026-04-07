import React, { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer } from '../api';

const CustomerList = ({ onRefresh, onEdit }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, [onRefresh]);

    const loadCustomers = async () => {
        try {
            const data = await getCustomers();
            if (Array.isArray(data)) {
                setCustomers(data);
            } else if (data && data.error) {
                console.error('Backend error fetching customers:', data.error);
                setCustomers([]);
            } else {
                setCustomers([]);
            }
        } catch (error) {
            console.error('Network error fetching customers:', error);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                loadCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('Error deleting customer: ' + error.message);
            }
        }
    };

    if (loading) return <p>Loading customers...</p>;

    return (
        <div className="customer-list">
            <h2>Customers</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <button onClick={() => onEdit(customer)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
