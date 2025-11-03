import { useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GOOGLE_MAPS_API_KEY } from "@/config/api";
import type { Coordinates } from "@/types";
import { MapPin, Search } from "lucide-react";

interface MapStepProps {
  coordinates: Coordinates | null;
  onCoordinatesChange: (coords: Coordinates) => void;
  onNext: () => void;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: -23.5505,
  lng: -46.6333,
};

const MapStep = ({ coordinates, onCoordinatesChange, onNext }: MapStepProps) => {
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(
    coordinates
  );
  const [mapCenter, setMapCenter] = useState<Coordinates>(coordinates || defaultCenter);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newCoords = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        setMarkerPosition(newCoords);
        onCoordinatesChange(newCoords);
      }
    },
    [onCoordinatesChange]
  );

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const newCoords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newCoords);
        setMapCenter(newCoords);
        onCoordinatesChange(newCoords);
      }
    }
  };

  const handleNext = () => {
    if (markerPosition) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE' ? (
        <div className="p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">
            ⚠️ Configure sua chave da API do Google Maps em <code className="bg-yellow-200 px-2 py-1 rounded">src/config/api.ts</code>
          </p>
          <p className="text-xs text-yellow-700 mt-2">
            Obtenha em: <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>
          </p>
        </div>
      ) : null}
      
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-5 w-5" />
        <p className="text-sm">
          Busque um endereço ou clique no mapa para selecionar a localização
        </p>
      </div>

      {isLoaded && GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE' && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Input
              type="text"
              placeholder="Buscar endereço..."
              className="pl-10 h-12 text-base"
            />
          </Autocomplete>
        </div>
      )}

      <div className="rounded-lg border-2 border-border overflow-hidden shadow-lg">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onClick={handleMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-[500px] bg-muted">
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        )}
      </div>

      {markerPosition && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Coordenadas selecionadas:</p>
          <p className="text-xs text-muted-foreground mt-1">
            Latitude: {markerPosition.lat.toFixed(6)} | Longitude:{" "}
            {markerPosition.lng.toFixed(6)}
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          size="lg"
          className="w-48"
        >
          VOLTAR
        </Button>
        <Button
          onClick={handleNext}
          disabled={!markerPosition}
          size="lg"
          className="w-48"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default MapStep;
