import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserData } from "@/types";

interface FormStepProps {
  userData: UserData;
  onUserDataChange: (data: UserData) => void;
  onNext: () => void;
  onBack: () => void;
}

const FormStep = ({
  userData,
  onUserDataChange,
  onNext,
  onBack,
}: FormStepProps) => {
  const [formData, setFormData] = useState<UserData>(userData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userName.trim()) {
      onUserDataChange(formData);
      onNext();
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="space-y-6 bg-card rounded-lg p-8 border-2 border-border shadow-lg">
        <div className="space-y-3">
          <Label htmlFor="userName" className="text-base font-medium">
            Nome do Usuário
          </Label>
          <Input
            id="userName"
            type="text"
            value={formData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            placeholder="Digite seu nome"
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="plantType" className="text-base font-medium">
            Tipo de Plantio
          </Label>
          <Input
            id="plantType"
            type="text"
            value={formData.plantType}
            onChange={(e) => handleChange("plantType", e.target.value)}
            placeholder="Ex: Lúpulo, Soja, etc. (opcional)"
            className="h-12 text-base"
          />
          <p className="text-xs text-muted-foreground">
            Campo opcional - deixe em branco se não houver plantio
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          onClick={onBack}
          variant="secondary"
          size="lg"
          className="w-48"
        >
          BACK
        </Button>
        <Button
          type="submit"
          disabled={!formData.userName.trim()}
          size="lg"
          className="w-48"
        >
          NEXT
        </Button>
      </div>
    </form>
  );
};

export default FormStep;
