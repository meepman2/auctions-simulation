import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as artifactData from "../Data/artifacts.json";
import { getDistance } from "geolib";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 250,
		float: "right",
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));

function AirportNPC() {
	const classes = useStyles();
	const [flightData, setFlightData] = useState({
		departure: "",
		arrival: "",
	});

	const [departureCoordinates, setDepartureCoordinates] = useState([0, 0]);
	const [arrivalCoordinates, setArrivalCoordinates] = useState([0, 0]);

	const [fare, setFare] = useState(0);

	useEffect(() => {
		const distance = getDistance(
			{ latitude: departureCoordinates[1], longitude: departureCoordinates[0] },
			{ latitude: arrivalCoordinates[1], longitude: arrivalCoordinates[0] }
		);

		setFare(distance);
	}, [departureCoordinates]);

	const handleChange = event => {
		const { name, value } = event.target;
		setFlightData(prevValues => {
			return { ...prevValues, [name]: value };
		});
	};

	const handleClick = () => {
		const { departure, arrival } = flightData;
		artifactData.artifacts.map(artifact => {
			if (artifact.country === departure) {
				setDepartureCoordinates(artifact.geometry.coordinates);
			} else if (artifact.country === arrival) {
				setArrivalCoordinates(artifact.geometry.coordinates);
			}
		});
	};

	return (
		<Card className={classes.root}>
			<CardHeader title="Airport" />
			<CardContent>
				<form className={classes.root}>
					<TextField name="departure" placeholder="Departure" variant="outlined" onChange={handleChange} />
					<TextField name="arrival" placeholder="Arrival" variant="outlined" onChange={handleChange} />
					<Button variant="contained" color="primary" onClick={handleClick}>
						Calculate
					</Button>
					<TextField name="fare" placeholder="Fare" variant="outlined" value={fare} />
				</form>
			</CardContent>
		</Card>
	);
}

export default AirportNPC;
