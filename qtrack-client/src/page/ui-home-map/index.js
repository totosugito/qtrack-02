import {Grid, useTheme} from "@mui/material";
import BaseUi from "../base-auth";
import {useState} from "react";
import * as ReactDOMServer from "react-dom/server";

import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import data from "../../assets/test/geojson-map.json";

const UiHomeMap = () => {
    const theme = useTheme()
    const styles = {
        container: {
            p: 1,
        },
        mapContainer: {
            height: `calc(100vh - 80px)`
        },
    }

    // const dataStore = useSelector((state) => state.skk)
    const [map, setMap] = useState(null)

    const setWellMarker = ({style, properties}, latlng) => {
        const markerHtmlStyles = `
          background-color: ${style.fill};
          width: 1.0rem;
          height: 1.0rem;
          display: block;
          left: -1.0rem;
          top: -1.0rem;
          position: relative;
          border-radius: 2rem 2rem 0;
          transform: rotate(45deg);
          border: 2px solid #FFFFFF`
        const icon = L.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 0],
            labelAnchor: [-6, 0],
            popupAnchor: [-6, -6],
            html: `<span style="${markerHtmlStyles}" />`
        })

        return L.marker(latlng, {
            icon: icon
            // icon: new L.Icon({
            //     iconUrl: MapMarkerPurple,
            //     iconSize: [32, 32], // Size of the icon
            // })
        });
    };

    const handleLayerWell = (feature, layer) => {
        const popupContent = ReactDOMServer.renderToString(
            <div>
                <div style={{color: feature["style"]["fill"]}}><strong>{feature["properties"]["name"]}</strong></div>
                <div style={{color: feature["style"]["fill"], fontSize: "85%"}}>{feature["properties"]["type"]}</div>
                <div>{feature["properties"]["desc"]}</div>
            </div>
        );
        layer.bindPopup(popupContent);
    }

    return (
        <>
            <BaseUi>
                <Grid container sx={styles.container}>
                    <Grid item xs={12}>
                    <MapContainer
                        style={styles.mapContainer}
                        center={data["initial"]["center"]}
                        zoom={data["initial"]["zoom"]}
                        ref={setMap}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/*{map && (*/}
                        {/*    <GeoJSON ref={geojsonRef} data={data["blocks"]} style={styles.polygonUnSelected}*/}
                        {/*             onEachFeature={handleLayerBlock}/>*/}
                        {/*)}*/}
                        {/*<GeoJSON data={data["blocksLabel"]} pointToLayer={setBlocksLabel}/>*/}
                        <GeoJSON data={data["wells"]} pointToLayer={setWellMarker} onEachFeature={handleLayerWell}/>
                    </MapContainer>
                    </Grid>
                </Grid>
            </BaseUi>
        </>
    )
}
export default UiHomeMap
