import React, { useEffect } from "react";

interface AdvancedMarkerProps {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
  content?: HTMLElement; // Optional custom HTML content for the marker
  title?: string;
  imgSrc?: string;
}

const AdvancedMarker: React.FC<AdvancedMarkerProps> = ({ map, position, content, title, imgSrc }) => {
  useEffect(() => {
    if (!map || !google.maps.marker.AdvancedMarkerElement) return;

    // Create a div to hold the image
    const content = document.createElement("div");
    if (imgSrc){
        const img = document.createElement("img");
        img.src = imgSrc; // Set the image source
        img.alt = title || "Marker";
        img.style.width = "30px"; // Adjust image size
        img.style.height = "30px"; // Adjust image size
        content.appendChild(img);
    }
    
    // Create an AdvancedMarkerElement
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map,
      title,
      content, // Custom HTML content, if provided
    });

    // Cleanup when the component is unmounted
    return () => {
      marker.map = null;
    };
  }, [map, position, content, title]);

  return null;
};

export default AdvancedMarker;
