import React, { useState, useEffect } from 'react';
import { getShipments, deleteShipment } from '../api';

const ShipmentList = ({ onRefresh, onEdit }) => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadShipments();
    }, [onRefresh]);

    const loadShipments = async () => {
        try {
            const data = await getShipments();
            if (Array.isArray(data)) {
                setShipments(data);
            } else {
                setShipments([]);
            }
        } catch (error) {
            console.error('Error fetching shipments:', error);
            setShipments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this shipment?')) {
            try {
                await deleteShipment(id);
                loadShipments();
            } catch (error) {
                console.error('Error deleting shipment:', error);
                alert('Error deleting shipment: ' + error.message);
            }
        }
    };

    if (loading) return <p>Loading shipments...</p>;

    return (
        <div className="shipment-list">
            <h2>Shipments</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map(shipment => (
                        <tr key={shipment.shipment_id}>
                            <td>{shipment.shipment_id}</td>
                            <td>{shipment.order_id}</td>
                            <td>{shipment.shipment_date && !isNaN(new Date(shipment.shipment_date).getTime()) ? new Date(shipment.shipment_date).toLocaleString() : 'N/A'}</td>
                            <td>{shipment.status}</td>
                            <td>
                                <button onClick={() => onEdit(shipment)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(shipment.shipment_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentList;
