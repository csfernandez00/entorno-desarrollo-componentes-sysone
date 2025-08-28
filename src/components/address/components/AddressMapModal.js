import React from "react";
import { Modal, Row, Col } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Solucionar iconos rotos de Leaflet en Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});




export default function AddressMapModal({ visible, onOk, onCancel, mapPosition, setMapPosition, t }) {

    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                console.log(`Coordenadas: ${e.latlng}`)
                setMapPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        return null;
    }

    return (
        <Modal
            open={visible}
            width={"600px"}
            title={t("address-found-title")}
            onOk={onOk}
            onCancel={onCancel}>
            <Row>
                <Col span={24} style={{ height: "400px" }}>
                    <MapContainer center={mapPosition} zoom={16} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapPosition}>
                            <Popup>Ubicación detectada</Popup>
                        </Marker>
                        {/* <LocationPicker /> */}
                    </MapContainer>
                </Col>
            </Row>
        </Modal>
    );
}
