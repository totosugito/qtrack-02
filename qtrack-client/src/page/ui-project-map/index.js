import React, {useState} from "react";
import BaseUi from "../base-auth";
import * as ReactDOMServer from "react-dom/server";

import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {connect} from "react-redux";
import selectors from "../../redux/selectors";
import Paths from "../../constants/Paths";
import {useTranslation} from "react-i18next";

const UiProjectMap = React.memo(({keyMap, geojson}) => {
  const [t] = useTranslation();
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
    });
  };

  const handleLayerWell = (feature, layer) => {
    const popupContent = ReactDOMServer.renderToString(
      <div>
        <div style={{color: feature["style"]["fill"]}}><strong>{feature["properties"]["name"]}</strong></div>
        <div>Lat : {feature['geometry']['coordinates'][0]}</div>
        <div>Lon : {feature['geometry']['coordinates'][1]}</div>
        <div>Progress : {feature['properties']['progress']}%</div>
        <div style={{marginTop: '3px', fontSize: '100%', textAlign: 'right'}}>
          <a href={Paths.PROJECTS.replace(':id', feature['properties']['id'])}>&#128073; Open Project</a>
        </div>
      </div>
    );
    layer.bindPopup(popupContent);
  }

  return (
    <>
      <BaseUi>
        <div style={{padding: '5px'}}>
          {geojson &&
            <MapContainer
              ref={setMap}
              style={{height: `calc(100vh - 60px)`}}
              center={geojson["initial"]["center"]}
              zoom={geojson["initial"]["zoom"]}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON key={keyMap} data={geojson.projects} pointToLayer={setWellMarker}
                       onEachFeature={handleLayerWell}/>
            </MapContainer>
          }
        </div>
      </BaseUi>
    </>
  )
})
UiProjectMap.propTypes = {}

UiProjectMap.defaultProps = {};

const mapStateToProps = (state) => {
  let geojson = {
    initial: {
      zoom: 4,
      center: [
        -3.9519408561575817,
        119.88281250000001
      ]
    },
    projects: {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    },
  }

  const projects = selectors.selectProjectsForCurrentUser(state);
  if (!projects) {
    return ({
      keyMap: 0,
      geojson: geojson,
    })
  }

  // create map key
  let keyMap = Math.floor((Math.random() * 1000000) + 1);

  // fill features marker data
  let features = []
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i]
    if (!project.eT)
      continue

    let lat_ = project.eT.lat
    let lon_ = project.eT.lon
    let progress_ = project.eT.progress;
    let color_ = '#DAA520'
    if ((progress_ > 25) && (progress_ <= 50))
      color_ = '#32CD32';
    else if ((progress_ > 50) && (progress_ <= 75))
      color_ = '#FF00FF';
    else if (progress_ > 75)
      color_ = '#0000CD';

    // empty latitude/longitude
    if ((lat_ === 0) && (lon_ === 0))
      continue

    // fill marker
    features.push(
      {
        type: "Feature",
        style: {
          fill: color_
        },
        properties: {
          name: project.name,
          id: project.id,
          progress: progress_
        },
        geometry: {
          type: "Point",
          coordinates: [
            lat_,
            lon_
          ]
        }
      }
    )
  }

  geojson.projects.features = features
  return {
    keyMap: keyMap,
    geojson: geojson,
  }
}
export default connect(mapStateToProps)(UiProjectMap)
