import { API_ENDPOINTS } from '@/config/api';
import type { Coordinates, UserData, AnalysisResponse } from '@/types';

export class ApiService {
  static async analyzeLocation(
    coordinates: Coordinates,
    userData: UserData
  ): Promise<AnalysisResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.ANALYZE_LOCATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          userName: userData.userName,
          plantType: userData.plantType || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch analysis:', error);
      throw error;
    }
  }
}
