import campoDigitalLogo from "@/assets/logo-campo-digital-header.png";

const Header = () => {
  return (
    <header className="w-full bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center gap-3">
        <img 
          src={campoDigitalLogo} 
          alt="Campo Digital" 
          className="h-12 w-auto"
        />
        <h1 className="text-xl font-bold text-primary-foreground">
          CampoDigital
        </h1>
      </div>
    </header>
  );
};

export default Header;
