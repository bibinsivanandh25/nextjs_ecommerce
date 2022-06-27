import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const Map = () => {
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{
      lat: "45.421532",
      lng: "-75.697189",
    }}
  />;
};
const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function Googlemap() {
  return (
    <div
      style={{
        width: "100vw",
        height: "400px",
        // background: "red",
      }}
    >
      <WrappedMap
        // eslint-disable-next-line react/jsx-curly-brace-presence
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }}>loading</div>}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
