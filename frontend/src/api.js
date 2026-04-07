const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

export const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
    return handleResponse(response);
};

export const createCustomer = async (customer) => {
    const response = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    return handleResponse(response);
};

export const updateCustomer = async (id, customer) => {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    return handleResponse(response);
};

export const deleteCustomer = async (id) => {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return handleResponse(response);
};

export const createProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return handleResponse(response);
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return handleResponse(response);
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};

export const getPayments = async () => {
    const response = await fetch(`${API_URL}/payments`);
    return handleResponse(response);
};

export const createPayment = async (payment) => {
    const response = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    });
    return handleResponse(response);
};

export const updatePayment = async (id, payment) => {
    const response = await fetch(`${API_URL}/payments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    });
    return handleResponse(response);
};

export const deletePayment = async (id) => {
    const response = await fetch(`${API_URL}/payments/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};

export const getShipments = async () => {
    const response = await fetch(`${API_URL}/shipments`);
    return handleResponse(response);
};

export const createShipment = async (shipment) => {
    const response = await fetch(`${API_URL}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipment)
    });
    return handleResponse(response);
};

export const updateShipment = async (id, shipment) => {
    const response = await fetch(`${API_URL}/shipments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipment)
    });
    return handleResponse(response);
};

export const deleteShipment = async (id) => {
    const response = await fetch(`${API_URL}/shipments/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};

export const getOrderItems = async () => {
    const response = await fetch(`${API_URL}/order-items`);
    return handleResponse(response);
};

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    return handleResponse(response);
};

export const getStats = async () => {
    const response = await fetch(`${API_URL}/stats`);
    return handleResponse(response);
};

export const getOrderById = async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`);
    return handleResponse(response);
};

export const createOrder = async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });
    return handleResponse(response);
};

export const updateOrder = async (id, order) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });
    return handleResponse(response);
};

export const deleteOrder = async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
};
