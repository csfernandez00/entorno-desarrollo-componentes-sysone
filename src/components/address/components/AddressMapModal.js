import React, { useEffect } from "react";
import { Modal, Row, Col } from "antd";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
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

    // Para actualizar la vista del mapa cuando cambia mapPosition
    const RecenterMap = ({ position }) => {
        const map = useMap();
        useEffect(() => {
            if (position) {
                map.setView(position, 16);
            }
        }, [position, map]);
        return null;
    };

    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                setMapPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        return null;
    };

    return (
        <Modal
            open={visible}
            width={"600px"}
            title={t("address-found-title")}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Row>
                <Col span={24} style={{ height: "400px" }}>
                    <MapContainer
                        center={mapPosition}
                        zoom={16}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapPosition}>
                            <Popup>Ubicación detectada</Popup>
                        </Marker>
                        <RecenterMap position={mapPosition} />
                        {/* <LocationPicker /> */}
                    </MapContainer>
                </Col>
            </Row>
        </Modal>
    );
}
