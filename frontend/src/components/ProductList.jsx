import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api';

const ProductList = ({ onRefresh, onEdit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, [onRefresh]);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product: ' + error.message);
            }
        }
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="product-list">
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>${Number(product.price).toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button onClick={() => onEdit(product)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
