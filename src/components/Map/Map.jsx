import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "../Data/skateboard-parks.json";
import "../Map/Map.css";

function Map() {
	const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

	const SIZE = 20;
	const [viewport, setViewport] = useState({
		latitude: 45.4211,
		longitude: -75.6903,
		width: "100vw",
		height: "100vh",
		zoom: 10,
	});
	const [selectedPark, setSelectedPark] = useState(null);

	useEffect(() => {
		const listener = e => {
			if (e.key === "Escape") {
				setSelectedPark(null);
			}
		};
		window.addEventListener("keydown", listener);

		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, []);

	return (
		<div>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken="pk.eyJ1IjoidmFydW5zYWNoZGV2YSIsImEiOiJja3F1azYxeHowNWQwMm9vMXpsNzFjZzdnIn0.vnKW75YqDHPdsKyoEH4BdA"
				mapStyle="mapbox://styles/varunsachdeva/ckqukbhxy6dr418qsh529bunr"
				onViewportChange={viewport => {
					setViewport(viewport);
				}}>
				{parkDate.features.map(park => (
					<Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
						<svg
							height={SIZE}
							viewBox="0 0 24 24"
							style={{
								cursor: "pointer",
								fill: "#d00",
								stroke: "none",
								transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
							}}
							onClick={e => {
								e.preventDefault();
								setSelectedPark(park);
							}}>
							<path d={ICON} />
						</svg>
					</Marker>
				))}

				{selectedPark ? (
					<Popup
						latitude={selectedPark.geometry.coordinates[1]}
						longitude={selectedPark.geometry.coordinates[0]}
						tipSize={5}
						anchor="top"
						onClose={() => {
							setSelectedPark(null);
						}}>
						<div>
							<h2>{selectedPark.properties.NAME}</h2>
							<p>{selectedPark.properties.DESCRIPTIO}</p>
						</div>
					</Popup>
				) : null}
			</ReactMapGL>
		</div>
	);
}

export default Map;
