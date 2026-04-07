import React, { useState } from 'react';
import './App.css';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import PaymentForm from './components/PaymentForm';
import PaymentList from './components/PaymentList';
import ShipmentForm from './components/ShipmentForm';
import ShipmentList from './components/ShipmentList';
import OrderItemList from './components/OrderItemList';
import Dashboard from './components/Dashboard';

function App() {
    const [editingOrder, setEditingOrder] = useState(null);
    const [isAddingOrder, setIsAddingOrder] = useState(false);
    
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingPayment, setEditingPayment] = useState(null);
    const [editingShipment, setEditingShipment] = useState(null);

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order || null);
        setIsAddingOrder(true);
    };

    const handleSaveOrder = () => {
        setIsAddingOrder(false);
        setEditingOrder(null);
        handleRefresh();
    };

    const handleCancelOrder = () => {
        setIsAddingOrder(false);
        setEditingOrder(null);
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
    };

    const handleSaveCustomer = () => {
        setEditingCustomer(null);
        handleRefresh();
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = () => {
        setEditingProduct(null);
        handleRefresh();
    };

    const handleEditPayment = (payment) => {
        setEditingPayment(payment);
    };

    const handleSavePayment = () => {
        setEditingPayment(null);
        handleRefresh();
    };

    const handleEditShipment = (shipment) => {
        setEditingShipment(shipment);
    };

    const handleSaveShipment = () => {
        setEditingShipment(null);
        handleRefresh();
    };

    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="App">
            <h1>Order Management System</h1>
            
            <nav className="tabs">
                <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
                <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>Customers</button>
                <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
                <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
                <button className={activeTab === 'other' ? 'active' : ''} onClick={() => setActiveTab('other')}>Payments & Shipments</button>
            </nav>

            <div className="dashboard">
                {activeTab === 'dashboard' && (
                    <div className="section">
                        <h2>System Overview</h2>
                        <Dashboard refreshTrigger={refreshTrigger} />
                    </div>
                )}

                {activeTab === 'customers' && (
                    <div className="section">
                        <CustomerForm 
                            customer={editingCustomer} 
                            onSave={handleSaveCustomer} 
                            onCancel={editingCustomer ? () => setEditingCustomer(null) : null}
                        />
                        <CustomerList onRefresh={refreshTrigger} onEdit={handleEditCustomer} />
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="section">
                        <ProductForm 
                            product={editingProduct} 
                            onSave={handleSaveProduct} 
                            onCancel={editingProduct ? () => setEditingProduct(null) : null}
                        />
                        <ProductList onRefresh={refreshTrigger} onEdit={handleEditProduct} />
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="section">
                        {isAddingOrder ? (
                            <OrderForm 
                                order={editingOrder} 
                                onSave={handleSaveOrder} 
                                onCancel={handleCancelOrder} 
                            />
                        ) : (
                            <>
                                <button onClick={() => handleEditOrder()}>Add New Order</button>
                                <OrderList 
                                    key={refreshTrigger} 
                                    onEdit={handleEditOrder} 
                                />
                                <hr />
                                <OrderItemList onRefresh={refreshTrigger} />
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'other' && (
                    <div className="section">
                        <div className="flex-container" style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <PaymentForm 
                                    payment={editingPayment} 
                                    onSave={handleSavePayment} 
                                    onCancel={editingPayment ? () => setEditingPayment(null) : null}
                                />
                                <PaymentList onRefresh={refreshTrigger} onEdit={handleEditPayment} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <ShipmentForm 
                                    shipment={editingShipment} 
                                    onSave={handleSaveShipment} 
                                    onCancel={editingShipment ? () => setEditingShipment(null) : null}
                                />
                                <ShipmentList onRefresh={refreshTrigger} onEdit={handleEditShipment} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
