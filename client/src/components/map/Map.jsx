import "./map.scss";
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
function Map({items}) {
    console.log(items);
    const position = [52.4297, -1.98269];
    return (
        <MapContainer className="map" center={position} zoom={7} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items?.map(( item) => (
                <Pin key={item.id} item={item} />
            ))}
        </MapContainer>
    );
}

export default Map;
