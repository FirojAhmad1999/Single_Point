import api from './axios.config';

export const operatorService = {
  async fetchOperators() {
    try {
      const response = await api.get('/operators');
      return response.data;
    } catch (error) {
      console.error('Error fetching operators:', error);
      throw error;
    }
  },
  
  async fetchOperatorById(id) {
    try {
      const response = await api.get(`/operators/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching operator ${id}:`, error);
      throw error;
    }
  }
};
