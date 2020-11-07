import api from '../shared/service/apis';

export const getPostsApi = () => api.get('/blogs').then((res) => res.data.res);
export const getPostBySlugApi = (slug) =>
    api.get(`/blogs/${slug}`).then((res) => res.data.res);
export const createPostApi = (data) => api.post('/blogs', data);
export const updatePostApi = (data) => api.patch('/blogs', data);
export const deletePostByslugApi = (slug) => api.delete(`/blogs/${slug}`);
