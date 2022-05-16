import axios from 'axios';
import setupInterceptors from '@/plugins/axios/setupInterceptors';

import { POLYGON_API_KEY } from '../../../env.common';

export const finplanInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const polygonInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: POLYGON_API_KEY,
  },
});

setupInterceptors(finplanInstance);
setupInterceptors(polygonInstance);

export default finplanInstance;
