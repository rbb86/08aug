import {beginRequest, endRequest} from './notification.js';
import API from './api.js';


const endpoints = {
    ITEMS: 'data/items',
    Item_BY_ID: 'data/items/'
}


const api = new API(
    '1EDA214E-FFFD-3B8E-FFA9-94C7FA364E00', 
    '288FBFCE-6B61-4A8E-A716-9E71BA1DA951', 
    beginRequest,
    endRequest);

export const login = api.login.bind(api);
export const logout = api.logout.bind(api);
export const register = api.register.bind(api);

export async function getItems(search) {

    if(!search){
        return api.get(endpoints.ITEMS);
    } else {
        return api.get(endpoints.ITEMS + `?where=genres%20LIKE%20%27%25${search}%25%27`)
    }
}

export async function getItemById(id) {
    return api.get(endpoints.Item_BY_ID + id);
}

export async function createItem(event) {
    return api.post(endpoints.ITEMS, event);
}

export async function updateItem(id, updatedProps) {
    return api.put(endpoints.Item_BY_ID + id, updatedProps);
}

export async function deleteItem(id) {
    return api.delete(endpoints.Item_BY_ID + id);
}

export async function getItemsByOwner() {
    const ownerId = sessionStorage.getItem('userId');

    return api.get(endpoints.ITEMS + `?where=ownerId%3D%27${ownerId}%27`)
}

