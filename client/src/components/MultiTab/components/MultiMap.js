import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { DEAL_STATUSES, STATES } from "../../../constants/common";

const MultiMap = ({ data }) => {
  const mapStyles = {
    height: "500px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 37.0902,
    lng: -95.7129,
  };

  const navigate = useNavigate();
  console.log("*data: ", data);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (state) => {
    setActiveMarker(state);
  };

  const handleMarkerDoubleClick = (state) => {
    console.log(`Double-clicked on ${state}`);
  };

  return (
    <div className="map-container">
      <GoogleMap mapContainerStyle={mapStyles} zoom={4} center={defaultCenter}>
        {data.properties.map((state, index) => {
          const stateCoordinates = STATES.find(
            (item) => item.value === state.state
          );
          const stateStatus = DEAL_STATUSES.find(
            (item) => item.value === state.status
          );

          let iconSvgText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${stateStatus.color}">
            <path d="M12 0C8.7 0 6 2.7 6 6c0 3.3 6 12 6 12s6-8.7 6-12c0-3.3-2.7-6-6-6zm0 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path>
          </svg>
          `;
          const customMarkerIconUrl = `data:image/svg+xml,${encodeURIComponent(
            iconSvgText
          )}`;

          return (
            <Marker
              key={state.state + index}
              icon={{
                url: customMarkerIconUrl,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              position={stateCoordinates?.coordinates}
              onClick={() => handleMarkerClick(state)}
              onDblClick={() => handleMarkerDoubleClick(state.state)}
            >
              {activeMarker === state && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <h4>{state.name}</h4>
                    <p>Address: {state.address}</p>
                    <p>City: {state.city}</p>
                    <p>State: {state.state}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MultiMap;
