import React, { useState, useEffect } from 'react';
import { getStats } from '../api';

const Dashboard = ({ refreshTrigger }) => {
    const [stats, setStats] = useState({
        customers: 0,
        products: 0,
        orders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [refreshTrigger]);

    if (loading) return <p>Loading stats...</p>;

    return (
        <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card customer-card">
                <h3>Total Customers</h3>
                <p>{stats.customers}</p>
            </div>
            <div className="stat-card product-card">
                <h3>Total Products</h3>
                <p>{stats.products}</p>
            </div>
            <div className="stat-card order-card">
                <h3>Total Orders</h3>
                <p>{stats.orders}</p>
            </div>
        </div>
    );
};

export default Dashboard;
