import React, { useState, useEffect } from 'react';
import { createCustomer, updateCustomer } from '../api';

const CustomerForm = ({ onSave, customer, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (customer) {
            setName(customer.name || '');
            setEmail(customer.email || '');
            setPhone(customer.phone || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (customer) {
                await updateCustomer(customer.customer_id, { name, email, phone });
            } else {
                await createCustomer({ name, email, phone });
            }
            if (!customer) {
                setName('');
                setEmail('');
                setPhone('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Error saving customer: ' + error.message);
        }
    };

    return (
        <div className="section">
            <h2>{customer ? 'Edit Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-buttons">
                    <button type="submit">{customer ? 'Update Customer' : 'Add Customer'}</button>
                    {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
