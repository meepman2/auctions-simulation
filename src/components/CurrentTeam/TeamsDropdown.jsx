import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import clsx from "clsx";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  placeonmap: {
    position: 'absolute',
    top: 0,
    right: '40%'
  },
  placeonauction: {
    position: 'relative',
    display: 'inline-block'
  }
}));

export default function TeamsDropdown({ teams, updateCurrentTeamOnMap, updateWinningAuctionTeam, updateTeamForMarketExpert }) {
  const classes = useStyles();
  const [currentTeam, setCurrentTeam] = React.useState('');
  const handleChange = (event) => {
    setCurrentTeam(event.target.value);
    updateCurrentTeamOnMap && updateCurrentTeamOnMap(event.target.value);
    updateWinningAuctionTeam && updateWinningAuctionTeam(event.target.value);
    updateTeamForMarketExpert && updateTeamForMarketExpert(event.target.value);
  };
  return (
    <div className={clsx({
      [classes.placeonmap]: updateCurrentTeamOnMap,
      [classes.placeonauction]: updateWinningAuctionTeam,
      [classes.placeonauction]: updateTeamForMarketExpert
    })}>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="current-team-select"
          value={currentTeam}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="Select Team" value="">--Select Current Team--</option>
          {
            teams.map(team => {
              return (
              <option key={team.id} value={team.id}>Team {team.name}</option>
              )
            })
          }
        </NativeSelect>
      </FormControl>
    </div>
  );
}