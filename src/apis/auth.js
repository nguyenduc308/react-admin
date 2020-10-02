import api from '../shared/service/apis';

export const loginApi = (credentials) => api.post('/auth/login', credentials);
