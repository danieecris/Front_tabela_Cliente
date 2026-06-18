import { apiClient } from '../../../lib/http/apiClient';

const ORDER_PATH = '/pedido';

export function getOrders() {
    return apiClient(ORDER_PATH);
}

export function getOrderById(id) {
    return apiClient(`${ORDER_PATH}/${id}`);
}

export function createOrder(payload) {
    return apiClient(ORDER_PATH, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateOrder(id, payload) {
    return apiClient(`${ORDER_PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export function deleteOrder(id) {
    return apiClient(`${ORDER_PATH}/${id}`, {
        method: 'DELETE',
    });
}