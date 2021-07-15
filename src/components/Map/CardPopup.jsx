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


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'contain'
  },
}));

const CardPopup = ({ selectedArtifact, handleCloseArtifact }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const openArtifactDetails = () => {
    setOpenModal(true);
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
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedArtifact.description}
          </Typography>
        </CardContent>
        <Button buttontext={'Buy!'} onClick={openArtifactDetails} />
      </Card>}
      { openModal &&
      <CustomizedModal open={openModal} setOpenModal={setOpenModal}>
        <div>
          <FirstPricedSealedBid artifact={selectedArtifact} />
        </div>
      </CustomizedModal>}
    </>
  );
}

export default CardPopup;