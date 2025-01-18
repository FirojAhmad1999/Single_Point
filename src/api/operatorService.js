
import api from './axios.config';

export const operatorService = {
  async fetchOperators() {
    try {
      const response = await api.get('/SinglePoint/GetAllOpreaterDetails');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching operators:', error);
      throw error;
    }
  },

  async fetchOperatorDetails(comId) {
    try {
      const response = await api.get(`/SinglePoint/GetOperatorDetails/${comId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching operator details:', error);
      throw error;
    }
  },
};


