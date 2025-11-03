export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserData {
  userName: string;
  plantType: string;
}

export interface AnalysisResponse {
  plantType?: string;
  weatherAnalysis: string;
  soilAnalysis: string;
}

export interface WizardData {
  coordinates: Coordinates | null;
  userData: UserData;
  analysisResult: AnalysisResponse | null;
}
