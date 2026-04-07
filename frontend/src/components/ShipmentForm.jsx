import React, { useState, useEffect } from 'react';
import { createShipment, updateShipment } from '../api';

const ShipmentForm = ({ onSave, shipment, onCancel }) => {
    const [orderId, setOrderId] = useState('');
    const [shipmentDate, setShipmentDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        if (shipment) {
            setOrderId(shipment.order_id || '');
            setShipmentDate(shipment.shipment_date ? new Date(shipment.shipment_date).toISOString().slice(0, 16) : '');
            setDeliveryDate(shipment.delivery_date ? new Date(shipment.delivery_date).toISOString().slice(0, 16) : '');
            setStatus(shipment.status || 'Pending');
        } else {
            setOrderId('');
            setShipmentDate('');
            setDeliveryDate('');
            setStatus('Pending');
        }
    }, [shipment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { 
                order_id: parseInt(orderId), 
                shipment_date: shipmentDate || null,
                delivery_date: deliveryDate || null,
                status: status 
            };
            if (shipment) {
                await updateShipment(shipment.shipment_id, data);
            } else {
                await createShipment(data);
            }
            if (!shipment) {
                setOrderId('');
                setShipmentDate('');
                setDeliveryDate('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving shipment:', error);
            alert('Error saving shipment: ' + error.message);
        }
    };

    return (
        <div className="section">
            <h2>{shipment ? 'Edit Shipment' : 'Add Shipment'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Order ID</label>
                    <input 
                        type="number" 
                        placeholder="Enter Order ID" 
                        value={orderId} 
                        onChange={(e) => setOrderId(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Shipment Date</label>
                    <input 
                        type="datetime-local" 
                        value={shipmentDate} 
                        onChange={(e) => setShipmentDate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Delivery Date (Optional)</label>
                    <input 
                        type="datetime-local" 
                        value={deliveryDate} 
                        onChange={(e) => setDeliveryDate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button type="submit">{shipment ? 'Update Shipment' : 'Add Shipment'}</button>
                    {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default ShipmentForm;
