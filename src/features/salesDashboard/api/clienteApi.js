import { apiClient } from '../../../lib/http/apiClient';

const CLIENT_PATH = '/cliente';

export function getClients() {
    return apiClient(CLIENT_PATH);
}

export function getClientById(id) {
    return apiClient(`${CLIENT_PATH}/${id}`);
}

export function createClient(payload) {
    return apiClient(CLIENT_PATH, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateClient(id, payload) {
    return apiClient(`${CLIENT_PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export function deleteClient(id) {
    return apiClient(`${CLIENT_PATH}/${id}`, {
        method: 'DELETE',
    });
}