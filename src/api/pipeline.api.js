import api from './axios.config';

export const pipelineApi = {
  getPipelines: () => api.get('/pipelines'),
  createPipeline: (data) => api.post('/pipelines', data),
  updatePipeline: (id, data) => api.put(`/pipelines/${id}`, data),
  deletePipeline: (id) => api.delete(`/pipelines/${id}`),
};