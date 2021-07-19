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
		margin: "10px 15%",
	},
	textinput: {
		display: "inline-block",
		width: "60%",
	},
	buttonstyle: {
		display: "inline-block",
	},
	pricecontainer: {
		position: "relative",
		display: "flex",
	},
}));

const steps = [
	{
		id: 0,
		description: "How much gold do you want to spend on this item? Discuss it with your teammates in breakout room. You have 3 minutes.",
	},
	{
		id: 1,
		description: "Come back and tell the price to me in private zoom chat.",
	},
	{
		id: 2,
		description: "Winner will be declared after I have prices from all the teams.",
	},
];

export default function FirstPricedSealedBid({ artifact }) {
	const classes = useStyles();
	const time = new Date();
	time.setSeconds(time.getSeconds() + 150);

  return (
    <div>
        <Card className={classes.root}>
            <CardHeader
            title={artifact.name}
            subheader={`${artifact.country}, ${artifact.region}`}
            />
            <CardMedia
            className={classes.media}
            component="img"
            height="200px"
            image={artifact.imageURL}
            title={artifact.name}
            />
            <CardContent>
              <Typography component="subtitle2" variant="subtitle2" style={{fontWeight: '700',lineHeight: '2'}}>
                {artifact.bodyType}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  {artifact.description}
              </Typography>
              <Typography variant="h6" component="p">
                <div className={classes.originalprice}>Beginning Price : {currency(artifact.originalValue, { pattern: "# " }).format()}</div>
              </Typography>
              <h3>FOLLOW BELOW STEPS</h3>
              <Tabs stepsData={steps} />
              <AuctionTimer expiryTimestamp={time} />
            </CardContent>
        </Card>
    </div>
  );
}
