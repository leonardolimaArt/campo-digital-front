export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserData {
  userName: string;
  plantType: string;
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
