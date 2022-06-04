import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

import "./Routes.css";

const MapView = (props) => {
  const { route } = props;
  const defaultCenter = { lat: 26.91, lng: 75.78 };
  const center =
    Object.keys(route).length && route.stops[0] !== "undefined"
      ? route.stops[0]
      : defaultCenter;

  return (
    <Map
      google={props.google}
      containerStyle={{ width: "50%", height: "calc(100% - 100px)" }}
      initialCenter={defaultCenter}
      center={center}
    >
      {Object.keys(route).length &&
        route.stops.map((stop, index) => {
          if (stop.lat) {
            return <Marker key={index} name={"Dolores park"} position={stop} />;
          }
          return null;
        })}
      {Object.keys(route).length &&
      route.stops.length > 1 &&
      !route.stops.includes("undefined") ? (
        <Polyline
          path={route.stops}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          key={route.id}
        />
      ) : null}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyC3CwN7fAmJ31sJECH3VTqNVYH3_08IWCM",
})(MapView);
