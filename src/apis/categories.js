import api from '../shared/service/apis';

export const getCategoriesApi = () =>
    api.get('/categories').then(({ data }) => data.res);
export const createCategoryApi = (values) =>
    api.post('/categories', values).then(({ data }) => data);
export const deleteCategoryByIdApi = (id) =>
    api.delete(`/categories/${id}`).then(({ data }) => data.res);
