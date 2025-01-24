import { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Libraries,MarkerF } from "@react-google-maps/api";
import StoreMarker from "@/pages/store/storeMarker";
import { MarkerItem } from "@/utils/dto";
import { useHeader } from "@/components/header";
import swAlert from "@/components/alert";

const libraries:Libraries = ['places',"marker"]
type LatLng = { lat: number; lng: number };

const StoreMap = () => {
  const key = import.meta.env.VITE_GOOGLEMAP_API_KEY;
  
  const {setHeader} = useHeader()
  const mapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<MarkerItem[]>([]);
  const [center, setCenter] = useState<LatLng>({ lat: 25.0197472, lng: 121.4570441 }); // Default center
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
    libraries:libraries
  });

  // Get the user's current position
  const fetchUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          swAlert.confirm({title:"Error",content:"Something happened",icon:"error"});
        }
      );
    } else {
      swAlert.confirm({title:"Error",content:"Something happened",icon:"error"});
    }
  }, []);

  // Perform a nearby search using the PlacesService
  const searchNearbyPlaces = useCallback((map: google.maps.Map,location:LatLng) => {
    if (!window.google) {
      swAlert.confirm({title:"Error",content:"Something happened",icon:"error"});
      return;
    }

    const service = new window.google.maps.places.PlacesService(map);
    
    service.nearbySearch(
      {
        location,
        radius: 1500, // 1.5 km radius
        type: "supermarket", 
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarkers: MarkerItem[] = results.map((place) => ({
            id: place.place_id,
            position: place.geometry?.location,
            title: place.name,
          }));
          setMarkers(newMarkers);
        } else {
          swAlert.confirm({title:"Error",content:"Something happened",icon:"error"});
        }
      }
    );
  }, []);

  // Initialize the map and search for nearby places
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    searchNearbyPlaces(map,center);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng });

    if (mapRef.current){
      searchNearbyPlaces(mapRef.current,{ lat, lng })
    }
  }

  useEffect(() => {
    fetchUserLocation();
    setHeader("Store","Store location and infromation")
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ height: "400px", width: "100%" }}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
    >
    {center && (
        <MarkerF position={center} title="You are here" />
    )}
    <StoreMarker markers={markers} map={mapRef.current}/>

    </GoogleMap>
  );
};


export default StoreMap;
