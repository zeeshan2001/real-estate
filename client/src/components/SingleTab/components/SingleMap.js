import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { DEAL_STATUSES, STATES } from "../../../constants/common";
import { selectProperties } from "../../../redux/actions";

const SingleMap = ({ property }) => {
  const mapStyles = {
    height: "550px",
    width: "100%",
  };
  const stateCoordinates = STATES.find(
    (item) => item.value === property?.state
  );
  const defaultCenter = stateCoordinates
    ? stateCoordinates.coordinates
    : { lat: 37.0902, lng: -95.7129 };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeMarker, setActiveMarker] = useState(null);

  const stateStatus = DEAL_STATUSES.find(
    (item) => item.value === property.status
  );
  let iconSvgText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${stateStatus.color}">
    <path d="M12 0C8.7 0 6 2.7 6 6c0 3.3 6 12 6 12s6-8.7 6-12c0-3.3-2.7-6-6-6zm0 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path>
  </svg>
  `;
  const customMarkerIconUrl = `data:image/svg+xml,${encodeURIComponent(
    iconSvgText
  )}`;

  const handleMarkerClick = () => {
    setActiveMarker(property);
  };

  const handleMarkerDoubleClick = () => {
    console.log("*property: ", property);
    if (property?._id) {
      dispatch(selectProperties([property._id]));
      navigate(`/dashboard`);
    }
  };

  useEffect(() => {
    setActiveMarker(property);
  }, [property]);

  return (
    <div className="map-container">
      <GoogleMap mapContainerStyle={mapStyles} zoom={4} center={defaultCenter}>
        <Marker
          icon={{
            url: customMarkerIconUrl,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          position={stateCoordinates?.coordinates}
          onClick={handleMarkerClick}
          onDblClick={handleMarkerDoubleClick}
        >
          {activeMarker && (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <h4>{property.name}</h4>
                <p>Address: {property.address}</p>
                <p>City: {property.city}</p>
                <p>State: {property.state}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  );
};

export default SingleMap;
