import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '../Tabs/CustomizedTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: '40px auto',
    height: '600px',
    overflowY: 'scroll'
  },
  media: {
    objectFit: 'contain'
  },
  originalprice: {
    margin: '10px 25%'
  },
  textinput: {
    display: 'inline-block',
    width: '60%'
  },
  buttonstyle: {
    display: 'inline-block'
  },
  pricecontainer: {
    position: 'relative',
    display: 'flex'
  }
}));

const steps = [{
  id: 0,
  description: 'Discuss how much gold you want to spend on this item with your teammates in breakout room. You have 2 minutes.'
}, {
  id: 1,
  description: 'Come back and tell the price to me in private zoom chat.'
}, {
  id: 2,
  description: 'Winner will be declared after I have prices from all the teams.'
}]

export default function FirstPricedSealedBid({ artifact }) {
  const classes = useStyles();

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
            height="350px"
            image={artifact.imageURL}
            title={artifact.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  {artifact.description}
              </Typography>
              <Typography variant="h6" component="p">
                <div className={classes.originalprice}>Beginning Price : {artifact.originalValue}</div>
                <h3>FOLLOW BELOW STEPS</h3>
              </Typography>
              <Tabs stepsData={steps} />
            </CardContent>
        </Card>
    </div>
  );
}