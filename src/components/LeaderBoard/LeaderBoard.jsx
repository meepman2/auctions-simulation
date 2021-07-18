import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, makeStyles } from "@material-ui/core";
import { red, blue, green } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import currency from "currency.js";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 1000,
		position: "absolute",
		bottom: "10px",
		marginLeft: "500px",
	},
	margin: {
		maxWidth: "300px",
	},
	avatarRed: {
		backgroundColor: red[500],
	},
	avatarBlue: {
		backgroundColor: blue[500],
	},
	avatarGreen: {
		backgroundColor: green[500],
	},
}));

function LeaderBoard() {
	const classes = useStyles();
	const [teams, setTeams] = useState([
		{
			color: classes.avatarRed,
			teamName: "Team 1",
			gold: 0,
		},
		{
			color: classes.avatarBlue,
			teamName: "Team 2",
			gold: 0,
		},
		{
			color: classes.avatarGreen,
			teamName: "Team 3",
			gold: 0,
		},
	]);

	return (
		<Card className={classes.root}>
			<CardContent>
				{teams.map(team => {
					return (
						<div className={classes.margin}>
							<Grid container spacing={1}>
								<Grid item>
									<Avatar className={team.color}> </Avatar>
								</Grid>
								<Grid item>
									<TextField label={team.teamName} />
								</Grid>
							</Grid>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}

export default LeaderBoard;
