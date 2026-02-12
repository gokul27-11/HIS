import axios from 'axios';
import { config } from '../config';

const fhirClient = axios.create({
  baseURL: config.fhirBaseUrl,
  headers: {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json',
  },
});

export const getPatients = async (name?: string) => {
  const params = name ? { name } : {};
  // Requests to http://localhost:8080/fhir/Patient
  const response = await fhirClient.get('/Patient', { params });
  return response.data;
};
