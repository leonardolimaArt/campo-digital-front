// API Configuration
// All API endpoints should be defined here

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Main analysis endpoint that receives coordinates, userName, and plantType
  ANALYZE_LOCATION: `${API_BASE_URL}/api/analyze`,
} as const;

// TODO: Adicione sua chave da API do Google Maps aqui
// Obtenha em: https://console.cloud.google.com/
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBrAW_lty4wWW5MOGSM8kWuT7Y702MrNwE';

export default API_ENDPOINTS;
