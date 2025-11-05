import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import logoImage from "@/assets/logo-campo-digital.png";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Placeholder images - you can add more images to the slideshow
  const slides = [slide1, slide2, slide3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleEnter = () => {
    if (termsAccepted) {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image Slideshow */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="Campo Digital"
              className="w-64 h-auto"
            />
          </div>

          {/* Enter Button */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <Button
                size="lg"
                className="w-64 text-lg font-semibold h-14"
                disabled={!termsAccepted}
                onClick={handleEnter}
              >
                ENTRAR
              </Button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed cursor-pointer select-none"
              >
                Concordo com os termos de uso e regras de direitos autorais
              </label>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Campo Digital
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Todos os direitos autorais reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
