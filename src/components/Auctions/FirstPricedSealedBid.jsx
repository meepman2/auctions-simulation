import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '../CustomizedButton/CustomizedButton';

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
    position: 'relative'
  }
}));

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
                <div className={classes.originalprice}>Lowest Price : {artifact.originalValue}</div>
              </Typography>
              <div className={classes.pricecontainer}>
                <TextField className={classes.textinput} id="outlined-basic" label="Enter your price" variant="outlined" />
                <Button className={classes.buttonstyle} buttontext={'Submit my price'} />
              </div>
            </CardContent>
        </Card>
    </div>
  );
}