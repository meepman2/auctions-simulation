import React from "react";
import Map from "./components/Map/Map";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

function App() {
	return (
		<div>
			<Map />
		</div>
	);
}

export default App;
