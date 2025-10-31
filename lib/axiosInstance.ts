import axios from 'axios';


const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  }
  
  // For server-side in development
  if (typeof window === 'undefined') {
    return 'http://localhost:3000';
  }
  
 
  return '';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;