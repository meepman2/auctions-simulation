import React from 'react';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    fontWeight: '700'
  },
}));

export default function CustomizedButton(props) {
  const { buttontext, buttonColor} = props;
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: buttonColor ? buttonColor : purple[500],
      '&:hover': {
        backgroundColor: buttonColor ? buttonColor : purple[700],
      },
    },
  }))(Button);
  const classes = useStyles();
  return (
    <div>
      <ColorButton variant="contained" color={buttonColor} className={classes.margin} {...props}>
        {buttontext}
      </ColorButton>
    </div>
  );
}