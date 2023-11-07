import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import districtsData from "../constants/districts.json";
import countiesData from "../constants/counties.json";
import subcountiesData from "../constants/sub-counties.json";
import parishesData from "../constants/parishes.json";
import kabaleData from "../constants/kabaleDistrict.json";
import kabaleSubcountyData from "../constants/kabaleSubCounties.json";
import userData from "../constants/userData.json";

import districtContent from "../constants/districtNames.json";
type LatLngExpression = [number, number];

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(8);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [visibleLayer, setVisibleLayer] = useState(districtsData);
  const [visibleContent, setVisibleContent] = useState(districtContent);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([
    1.3476, 32.5825,
  ]);

  const [hoveredDistrict, setHoveredDistrict] = useState("");
  const [registered, setRegistered] = useState(0);


  useEffect(() => {}, [zoomLevel, visibleLayer]);

  const customMarkerIcon = (name: any) =>
    divIcon({
      html: name,
      className: "icon",
    });

  const setIcon = ({ properties }: any, latlng: any) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
  };

  const handleFeatureClick = (properties: any) => {
    const dName = properties.dname_2006;
    const cName = properties.cname_2006;
    const sName = properties.sname_2006;
    const pName = properties.pname_2002;

    // Determine zoom level and visible layers based on the properties
    if (dName && !sName && !pName) {
      setZoomLevel(10); // Zoom to county level
      setVisibleLayer(subcountiesData);
      setVisibleContent(kabaleSubcountyData);
      visibleContent.features.map((feature) => {
        if (feature.properties.Name.toLocaleUpperCase() == dName) {
          setMapCenter([
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]);
        }
      });
    } else if (dName && sName && !pName) {
      setZoomLevel(14); // Zoom to parish level
      setVisibleLayer(parishesData);
      setVisibleContent(kabaleSubcountyData);

      visibleContent.features.map((feature) => {
        console.log(feature.properties);
        console.log(sName);
        if (feature.properties.Name.toLocaleUpperCase() == sName) {
          setMapCenter([
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]);
        }
      });
    } else {
      // Handle other cases or set default zoom level and visible layers
      setZoomLevel(7.5); // Set default zoom level
      setVisibleLayer(districtsData); // Set default visible layer (districts, for example)
      setVisibleContent(districtContent);
    }

    setSelectedFeature(properties);
  };

  const handleMouseOver = (properties: any) => {
    setHoveredDistrict(properties.dname_2006 || "");
    if(properties.dname_2006==="KABALE") setRegistered(userData.length)
  };

  const handleMouseOut = () => {
    setHoveredDistrict("");
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => handleFeatureClick(feature.properties),
      mouseover: () => handleMouseOver(feature.properties),
      mouseout: handleMouseOut,
    });
  };
  // @ts-ignore
  return (
    <MapContainer
      key={zoomLevel}
      center={mapCenter}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      maxBoundsViscosity={1.0}
      className="leaflet-container"
      doubleClickZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* @ts-ignore */}
      <GeoJSON data={visibleLayer} style={{ weight: 1 }} onEachFeature={onEachFeature}/>
      {/* @ts-ignore */}
      <GeoJSON data={visibleContent} pointToLayer={setIcon} />
      {hoveredDistrict !== null && (
        <div className="hovered-district">
          <p>Hovered District: {hoveredDistrict}</p>
          Registered People: {registered}
        </div>
      )}
      {console.log(hoveredDistrict)}
    </MapContainer>
  );
};

export default Map;
