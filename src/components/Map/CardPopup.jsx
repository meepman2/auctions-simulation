import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../CustomizedButton/CustomizedButton';
import CustomizedModal from '../CustomizedModal/CustomizedModal';
import FirstPricedSealedBid from '../Auctions/FirstPricedSealedBid.jsx';
import FirstPricedAuction from '../Auctions/FirstPricedAuction.jsx';
import currency from "currency.js";


const auctionTypeMapping = [{
  type: "1",
  component: FirstPricedSealedBid
}, {
  type: "2",
  component: FirstPricedAuction
}, {
  type: "3",
  component: FirstPricedAuction
}];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    float: "left",
    top: 0,
    position: 'absolute'
  },
  media: {
    objectFit: 'contain'
  },
}));

const CardPopup = ({ selectedArtifact, handleCloseArtifact, setAuctionedArtifact, teams, updateAmtForTeam, updateArtifactNumberForTeams }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const openArtifactDetails = () => {
    setOpenModal(true);
  }

  const renderAuctionModal = () => {
    const { auctionType } = selectedArtifact;
    const Component = auctionTypeMapping.reduce((acc, auction) => {
      acc = FirstPricedSealedBid;
      if (auction.type === auctionType) {
        acc = auction.component;
        return acc;
      }
      return acc;
    }, '');
    return <Component artifact={selectedArtifact} setAuctionedArtifact={setAuctionedArtifact} teams={teams} updateAmtForTeam={updateAmtForTeam} updateArtifactNumberForTeams={updateArtifactNumberForTeams} />
  }

  return (
    <>
      {!openModal && <Card className={classes.root}>
        <CardHeader
          title={selectedArtifact.name}
          subheader={`${selectedArtifact.country}, ${selectedArtifact.region}`}
          action={
              <IconButton aria-label="close" onClick={handleCloseArtifact}>
                <CloseIcon />
              </IconButton>
          }
        />
        <CardMedia
          className={classes.media}
          component="img"
          height="350px"
          image={selectedArtifact.imageURL}
          title={selectedArtifact.name}
        />
        <CardContent>
          <Typography variant="subtitle2" style={{fontWeight: '700',lineHeight: '2'}}>
            {selectedArtifact.bodyType}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedArtifact.description}
          </Typography>
          <br/>
          <Typography variant="subtitle">
            Beginning Price : {currency(selectedArtifact.originalValue, { pattern: "# " }).format()}
          </Typography>
        </CardContent>
        <Button buttontext={'Buy!'} onClick={openArtifactDetails} />
      </Card>}
      { openModal &&
      <CustomizedModal open={openModal} setOpenModal={setOpenModal}>
        <div>
          {renderAuctionModal()}
        </div>
      </CustomizedModal>}
    </>
  );
}

export default CardPopup;