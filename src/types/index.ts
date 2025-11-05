export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserData {
  username: string;
  plant_type: string;
}

export interface AnalysisResponse {
  plant_type?: string;
  weather_analysis: string;
  soil_analysis: string;
}

export interface WizardData {
  coordinates: Coordinates | null;
  userData: UserData;
  analysisResult: AnalysisResponse | null;
}
