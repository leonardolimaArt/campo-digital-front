import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import type { Coordinates, UserData, AnalysisResponse } from "@/types";
import { Loader2, CloudSun, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ResultsStepProps {
  coordinates: Coordinates;
  userData: UserData;
  onBack: () => void;
  onNewAnalysis: () => void;
}

const ResultsStep = ({ coordinates, userData, onBack, onNewAnalysis }: ResultsStepProps) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.analyzeLocation(coordinates, userData);
        setResult(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao buscar análise";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Erro",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [coordinates, userData, toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Analisando localização...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-8 text-center">
          <p className="text-destructive font-medium">{error}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={onBack} variant="secondary" size="lg" className="w-48">
            VOLTAR
          </Button>
          <Button
            onClick={onNewAnalysis}
            variant="outline"
            size="lg"
            className="w-48"
          >
            NOVA ANÁLISE
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border-2 border-border bg-muted p-8 text-center">
          <p className="text-muted-foreground">Nenhum resultado disponível</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={onBack} variant="secondary" size="lg" className="w-48">
            VOLTAR
          </Button>
          <Button
            onClick={onNewAnalysis}
            variant="outline"
            size="lg"
            className="w-48"
          >
            NOVA ANÁLISE
          </Button>
        </div>
      </div>
    );
  }

  const displayPlantType = result.plant_type || userData.plant_type || "Solo sem plantio";

  return (
    <div className="flex flex-col gap-6">
      {/* Plant Type Header */}
      <div className="bg-primary text-primary-foreground rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Sprout className="h-6 w-6" />
          <h2 className="text-2xl font-bold uppercase">{displayPlantType}</h2>
        </div>
      </div>

      {/* Weather Analysis */}
      <div className="bg-muted rounded-lg p-6 border-2 border-border shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <CloudSun className="h-6 w-6 text-accent" />
          <h3 className="text-xl font-semibold uppercase">Análise Climática</h3>
        </div>
        <div className="bg-card rounded p-4 border border-border">
          <p className="text-foreground whitespace-pre-wrap">{result.weather_analysis}</p>
        </div>
      </div>

      {/* Soil Analysis */}
      <div className="bg-muted rounded-lg p-6 border-2 border-border shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-6 bg-secondary rounded" />
          <h3 className="text-xl font-semibold uppercase">Análise do Solo</h3>
        </div>
        <div className="bg-card rounded p-4 border border-border">
          <p className="text-foreground whitespace-pre-wrap">{result.soil_analysis}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary" size="lg" className="w-48">
          VOLTAR
        </Button>
        <Button
          onClick={onNewAnalysis}
          variant="outline"
          size="lg"
          className="w-48"
        >
          NOVA ANÁLISE
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
