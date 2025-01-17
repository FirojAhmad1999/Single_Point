import api from './axios.config';

export const operatorService = {
  async fetchOperators() {
    try {
      const response = await api.get('/SinglePoint/GetAllOpreaterDetails');
      return response.data.data; // Access `data` directly from the response
    } catch (error) {
      console.error('Error fetching operators:', error);
      throw error;
    }
  },
};
