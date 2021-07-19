import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as artifactData from "../../Data/artifacts.json";
import { getDistance } from "geolib";
import loDash from "lodash";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import currency from "currency.js";

const useStyles = makeStyles(theme => ({
	root: {
		width: 245,
		float: "right",
		padding: 10,
		marginRight: "10px",
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
		margin: "0 0 20px 50px",
		width: 200,
	},
	paybutton: {
		margin: "0 0 20px 50px",
		backgroundColor: "purple",
		color: "#ffffff",
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

		setFare(currency(distance, { pattern: `# ` }).format());
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
							placeholder="Currently In"
							variant="outlined"
							onChange={handleChange}
						/>
						<TextField
							className={classes.form}
							size="small"
							name="arrival"
							placeholder="Fly To"
							variant="outlined"
							onChange={handleChange}
						/>
						<div>
							<TextField className={classes.form} size="small" name="fare" placeholder="Fare" variant="outlined" value={fare} />
							<Button className={classes.paybutton} variant="contained" onClick={handleClick}>
								Pay
							</Button>
						</div>
					</form>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default AirportNPC;
