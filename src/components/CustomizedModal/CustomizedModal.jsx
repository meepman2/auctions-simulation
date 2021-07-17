import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeicon: {
    float: 'right',
    backgroundColor: '#ffffff',
    color: '#000000'
  }
}));

const CustomizedModal = (props) => {
  const classes = useStyles();
  const { open, setOpenModal } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-modal-title"
        aria-describedby="customized-modal-description"
      >
        <>
          <IconButton aria-label="close" onClick={handleClose} className={classes.closeicon}>
            <CloseIcon />
          </IconButton>
          {props.children}
        </>
      </Modal>
    </div>
  );
}

export default CustomizedModal;