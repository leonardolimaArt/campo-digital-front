import { useState } from "react";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import MapStep from "@/components/steps/MapStep";
import FormStep from "@/components/steps/FormStep";
import ResultsStep from "@/components/steps/ResultsStep";
import type { WizardData } from "@/types";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    coordinates: null,
    userData: {
      username: "",
      plant_type: "",
    },
    analysisResult: null,
  });

  const handleCoordinatesChange = (coords: typeof wizardData.coordinates) => {
    setWizardData((prev) => ({ ...prev, coordinates: coords }));
  };

  const handleUserDataChange = (userData: typeof wizardData.userData) => {
    setWizardData((prev) => ({ ...prev, userData }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetWizard = () => {
    setWizardData({
      coordinates: null,
      userData: {
        username: "",
        plant_type: "",
      },
      analysisResult: null,
    });
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        
        <div className="mt-8">
          {currentStep === 1 && (
            <MapStep
              coordinates={wizardData.coordinates}
              onCoordinatesChange={handleCoordinatesChange}
              onNext={goToNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <FormStep
              userData={wizardData.userData}
              onUserDataChange={handleUserDataChange}
              onNext={goToNextStep}
              onBack={goToPrevStep}
            />
          )}
          
          {currentStep === 3 && wizardData.coordinates && (
            <ResultsStep
              coordinates={wizardData.coordinates}
              userData={wizardData.userData}
              onBack={goToPrevStep}
              onNewAnalysis={resetWizard}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
