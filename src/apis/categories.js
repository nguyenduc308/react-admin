import api from '../shared/service/apis';

export const getCategoriesApi = () => api.get('/categories');
export const createCategoryApi = (data) => api.post('/categories', data);
