import api from './axios.config';

export const fetchOperators = async () => {
  try {
    const response = await api.get('/operators');
    return response.data;
  } catch (error) {
    console.error('Error fetching operators:', error);
    throw error;
  }
};
