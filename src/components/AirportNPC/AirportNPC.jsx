import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as artifactData from "../Data/artifacts.json";
import { getDistance } from "geolib";
import loDash from "lodash";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 245,
		float: "right",
		padding: 10,
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	form: {
		padding: 10,
		width: 200,
	},
}));

function AirportNPC() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
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
			return { ...prevValues, [name]: loDash.capitalize(value) };
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

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				title="Airport"
				action={
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more">
						<ExpandMoreIcon />
					</IconButton>
				}
			/>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<form className={classes.root} autoComplete="off">
						<TextField
							className={classes.form}
							size="small"
							name="departure"
							placeholder="Departure"
							variant="outlined"
							onChange={handleChange}
						/>
						<TextField
							className={classes.form}
							size="small"
							name="arrival"
							placeholder="Arrival"
							variant="outlined"
							onChange={handleChange}
						/>
						<Button className={classes.form} variant="contained" color="primary" onClick={handleClick}>
							Calculate
						</Button>
						<TextField className={classes.form} size="small" name="fare" placeholder="Fare" variant="outlined" value={fare} />
					</form>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default AirportNPC;
