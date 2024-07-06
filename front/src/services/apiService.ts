import axios from 'axios';

const API_URL = 'http://localhost:3000/health-check'; // NestJS app URL

export const healthCheck = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};
