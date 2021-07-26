import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Map from "./components/Map/Map";
import StartScreen from "./components/StartScreen/StartScreen";
import StagingArea from "./components/StagingArea/StagingArea";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import gameStateContext from "./context/GameContext";

function App() {
	const [gameState, setGameState] = useState({});
	useEffect(() => {
		const socket = io("http://localhost:5000");
		socket.on("gameState", handleGameState);
	}, []);

	const handleGameState = gameState => {
		gameState = JSON.parse(gameState);
	};

	return (
		<BrowserRouter>
			<gameStateContext.Provider value={{ gameState, setGameState }}>
				<Switch>
					<Route path="/" exact component={StartScreen} />
					<Route path="/staging/:code" exact component={StagingArea} />
					<Route path="/map/:code" exact component={Map} />
				</Switch>
			</gameStateContext.Provider>
		</BrowserRouter>
	);
}

export default App;
