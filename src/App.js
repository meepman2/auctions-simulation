import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import StartScreen from "./components/StartScreen/StartScreen";
import StagingArea from "./components/StagingArea/StagingArea";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import gameStateContext from "./context/GameContext";
import { socket } from "./context/SocketContext";
import { yellow, blue, green } from "@material-ui/core/colors";

const teams = [
	{
		id: 1,
		name: "blue",
		color: blue[500],
		initialAmt: 100000,
		currentAmt: 100000,
		numberOfCars: 0,
	},
	{
		id: 2,
		name: "green",
		color: green[500],
		initialAmt: 100000,
		currentAmt: 100000,
		numberOfCars: 0,
	},
	{
		id: 3,
		name: "yellow",
		color: yellow[500],
		initialAmt: 100000,
		currentAmt: 100000,
		numberOfCars: 0,
	},
];

function App() {
	const [gameState, setGameState] = useState({
		roomCode: "",
		player: {
			playerId: "",
			playerName: "",
			teamName: "",
			gold: 1000000,
			inventory: [],
			playerCoordinates: {
				longitude: 0,
				latitude: 0,
			},
		},
	});
	useEffect(() => {
		socket.on("gameState", handleGameState);
	}, [gameState]);

	const handleGameState = gameState => {
		gameState = JSON.parse(gameState);
		console.log(gameState);
	};

	return (
		<BrowserRouter>
			<gameStateContext.Provider value={{ gameState, setGameState }}>
				<Switch>
					<Route path="/" exact component={StartScreen} />
					<Route path="/staging/:code" exact component={StagingArea} />
					<Route path="/map/:code">
						<Map teams={teams} />
					</Route>
				</Switch>
			</gameStateContext.Provider>
		</BrowserRouter>
	);
}

export default App;
