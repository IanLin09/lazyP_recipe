import { useState} from "react";
import { MarkerF,InfoWindow } from "@react-google-maps/api";
import { MarkerItem } from "@/utils/dto";

interface Props {
    markers: MarkerItem[],
    map: google.maps.Map | null
}

const StoreMarker = ({markers,map}:Props) => {
    const key = import.meta.env.VITE_GOOGLEMAP_API_KEY;
    const [selectedMarker, setSelectedMarker] = useState<MarkerItem | null>(null);
    const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);
    const icon = "https://res.cloudinary.com/dsftikc0a/image/upload/v1737280113/recipe/spbzwclojg6do4xueclk.png"

    const fetchPlaceDetail = (placeId:string) => {
        if (map){
            const service = new window.google.maps.places.PlacesService(map);
            service.getDetails(
                { placeId },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        setPlaceDetails(place); // Save place details
                    }
                }
            );
        }
    }

    // const advMarker = ({title,position}:MarkerItem,click:() =>void) => {
    //   const content = document.createElement("div");
      
    //   let img = document.createElement("img");
    //   img.src = "https://res.cloudinary.com/dsftikc0a/image/upload/v1737280113/recipe/spbzwclojg6do4xueclk.png"; // Set the image source
    //   img.alt = title || "Marker";
    //   img.style.width = "30px"; // Adjust image size
    //   img.style.height = "30px"; // Adjust image size
    //   content.appendChild(img);
      
      
    //   // Create an AdvancedMarkerElement
    //   const advMarker = new google.maps.marker.AdvancedMarkerElement({
    //     position,
    //     map,
    //     title,
    //     content, // Custom HTML content, if provided
    //   });
    //   advMarker.addListener("click",click)

    //   return advMarker;
    // }

    return (
        <>
            {markers.map((marker) =>
                marker.position ? (
                <MarkerF 
                    icon={{
                        url:icon,
                        scaledSize:new google.maps.Size(30, 30)
                    }}
                    key={marker.id} 
                    position={marker.position} 
                    title={marker.title} 
                    onClick={()=>{
                        setSelectedMarker(marker)
                        fetchPlaceDetail(marker.id || "")
                    }}
                />
                
                ) : null
            )}  
            {selectedMarker && placeDetails && (
                <InfoWindow
                  position={selectedMarker.position}
                  onCloseClick={() => {
                    setSelectedMarker(null);
                    setPlaceDetails(null);
                  }}
                >
                  <div>
                    <h3>{placeDetails.name}</h3>
                    <p>{placeDetails.formatted_address}</p>
                    <p>
                      Parking Lot: {placeDetails.types?.includes("parking") ? "Yes" : "No"}
                    </p>
                    {placeDetails.opening_hours?.weekday_text && (
                      <ul>
                        {placeDetails.opening_hours.weekday_text.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </InfoWindow>
            )}
        </>
    );
};

export default StoreMarker;
