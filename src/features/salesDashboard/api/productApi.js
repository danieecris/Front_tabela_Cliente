import { apiClient } from '../../../lib/http/apiClient';

const PRODUCT_PATH = '/produto';

export function getProduct() {
    return apiClient(PRODUCT_PATH);
}

export function getProductById(id) {
    return apiClient(`${PRODUCT_PATH}/${id}`);
}

export function createProduct(payload) {
    return apiClient(PRODUCT_PATH, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateProduct(id, payload) {
    return apiClient(`${PRODUCT_PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export function deleteProduct(id) {
    return apiClient(`${PRODUCT_PATH}/${id}`, {
        method: 'DELETE',
    });
}