import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api';

const ProductForm = ({ onSave, product, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || '');
            setStock(product.stock || '');
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = { 
                name, 
                description, 
                price: parseFloat(price), 
                stock: parseInt(stock) 
            };
            if (product) {
                await updateProduct(product.product_id, productData);
            } else {
                await createProduct(productData);
            }
            if (!product) {
                setName('');
                setDescription('');
                setPrice('');
                setStock('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        }
    };

    return (
        <div className="section">
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-control"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Stock Level</label>
                    <input type="number" placeholder="Quantity" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <div className="form-buttons">
                    <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
                    {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
