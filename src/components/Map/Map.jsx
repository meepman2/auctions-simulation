import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = "pk.eyJ1IjoidmFydW5zYWNoZGV2YSIsImEiOiJja3F1azYxeHowNWQwMm9vMXpsNzFjZzdnIn0.vnKW75YqDHPdsKyoEH4BdA";
function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(77);
	const [lat, setLat] = useState(29);
	const [zoom, setZoom] = useState(2);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/varunsachdeva/ckqukbhxy6dr418qsh529bunr",
			center: [lng, lat],
			zoom: zoom,
		});

		if (!map.current) return; // wait for map to initialize
		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}

export default Map;
