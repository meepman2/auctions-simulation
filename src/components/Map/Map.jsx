import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as artifactData from "../../Data/artifacts.json";
import "../Map/Map.css";
import CardPopup from "./CardPopup";
import AirportNPC from "../AirportNPC/AirportNPC";
import RulesCard from "../RulesCard/RulesCard";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

function Map() {
    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const SIZE = 40;
    const [viewport, setViewport] = useState({
        latitude: 40,
        longitude: 20,
        width: "100%",
        height: "100vh",
        zoom: 2,
    });
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [auctionedArtifacts, setAuctionedArtifacts] = useState([]);
    const [renderPins, setRenderPins] = useState([]);

    useEffect(() => {
        setRenderPins(artifactData.artifacts);

    	const listener = e => {
    		if (e.key === "Escape") {
    			setSelectedArtifact(null);
    		}
    	};
    	window.addEventListener("keydown", listener);

    	return () => {
    		window.removeEventListener("keydown", listener);
    	};
    }, []);

    const handleCloseArtifact = () => {
        setSelectedArtifact(null);
    };

    const setAuctionedArtifact = () => {
        renderPins.map(car => {
            if (car && car.id === selectedArtifact.id) {
                car.render = false;
            }
        });
        setAuctionedArtifacts(prevState => [...prevState, selectedArtifact.id]);
    }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoidmFydW5zYWNoZGV2YSIsImEiOiJja3F1azYxeHowNWQwMm9vMXpsNzFjZzdnIn0.vnKW75YqDHPdsKyoEH4BdA"
                mapStyle="mapbox://styles/varunsachdeva/ckqukbhxy6dr418qsh529bunr">
                {renderPins.map(artifact => {
                    const isSelectedArtifact = selectedArtifact && artifact.id === selectedArtifact.id;
                    const isRenderArtifact = !auctionedArtifacts.includes(artifact.id);
                    return (
                        <Marker key={artifact.name} latitude={artifact.geometry.coordinates[1]} longitude={artifact.geometry.coordinates[0]}>
                            <svg
                                height={SIZE}
                                viewBox="0 0 24 24"
                                style={{
                                    cursor: "pointer",
                                    fill: !isRenderArtifact ? '#ccc' : (isSelectedArtifact ? "#000" : "#d00"),
                                    stroke: "rgba(0, 0, 0, 0.40)",
                                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                                    zIndex: "1000",
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedArtifact(artifact);
                                }}>
                                <path d={ICON} />
                            </svg>
                        </Marker>
                    );
                })}
                <AirportNPC />
                <RulesCard />
                <LeaderBoard />
                {selectedArtifact ? <CardPopup selectedArtifact={selectedArtifact} handleCloseArtifact={handleCloseArtifact} setAuctionedArtifact={setAuctionedArtifact} /> : null}
            </ReactMapGL>
        </div>
    );
}

export default Map;
