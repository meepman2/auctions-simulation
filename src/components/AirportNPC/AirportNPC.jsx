import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 345,
		float: "right",
	},
	table: {
		minWidth: 345,
	},
}));

function createData(departure, arrival, fare) {
	return { departure, arrival, fare };
}

const rows = [
	createData("Europe", "Asia", 1000),
	createData("Europe", "South America", 1000),
	createData("South America", "Asia", 1000),
	createData("South America", "Europe", 1000),
	createData("Asia", "South America", 1000),
	createData("Asia", "Europe", 1000),
];

function AirportNPC() {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader title="Airport" />
			<CardContent>
				<TableContainer component={Paper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Departure</TableCell>
								<TableCell>Arrival</TableCell>
								<TableCell>Ticket Fare</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map(row => (
								<TableRow key={row.departure}>
									<TableCell component="th" scope="row">
										{row.departure}
									</TableCell>
									<TableCell>{row.arrival}</TableCell>
									<TableCell>{row.fare}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	);
}

export default AirportNPC;
