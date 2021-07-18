import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tabs from "../Tabs/CustomizedTabs";
import AuctionTimer from "../Timer/AuctionTimer";
import currency from "currency.js";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 500,
		margin: "40px auto",
		height: "600px",
		overflowY: "scroll",
	},
	media: {
		objectFit: "contain",
	},
	originalprice: {
		margin: "10px 25%",
	},
	buttonstyle: {
		display: "inline-block",
	},
}));

export default function FirstPricedAuction({ artifact }) {
	const classes = useStyles();
	const time = new Date();
	time.setSeconds(time.getSeconds() + 150);

	const steps = [
		{
			id: 0,
			description: "Discuss how much gold you want to spend on this item with your teammates in chat. You have 3 minutes.",
		},
		{
			id: 1,
			description: "Yell your prices in front of everyone!!",
		},
	];

	return (
		<div>
			<Card className={classes.root}>
				<CardHeader title={artifact.name} subheader={`${artifact.country}, ${artifact.region}`} />
				<CardMedia className={classes.media} component="img" height="200px" image={artifact.imageURL} title={artifact.name} />
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{artifact.description}
					</Typography>
					<Typography variant="h6" component="p">
						<div className={classes.originalprice}>
							Beginning with Price : {currency(artifact.originalValue, { pattern: "# " }).format()}
						</div>
						<h3>FOLLOW BELOW STEPS</h3>
					</Typography>
					<Tabs stepsData={steps} />
					<AuctionTimer expiryTimestamp={time} />
				</CardContent>
			</Card>
		</div>
	);
}
