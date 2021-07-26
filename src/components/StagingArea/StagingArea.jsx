import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gameStateContext from "../../context/GameContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		width: 500,
		padding: 100,
		margin: "0 30%",
	},
	form: {
		margin: "0 0 20px 0px",
		width: 400,
	},
}));

function StagingArea() {
	const classes = useStyles();
	const { gameState, setGameState } = useContext(gameStateContext);
	const history = useHistory();

	const handleChange = event => {
		const { name, value } = event.target;
		setGameState(prevValues => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	};

	const handleClick = () => {
		history.push("/map/" + gameState.code);
	};

	return (
		<div className={classes.root}>
			<div>
				<h1 className={classes.form}>Your game code is:{gameState.code}</h1>
			</div>
			<form>
				<TextField className={classes.form} name="playerName" label="Player Name" variant="outlined" onChange={handleChange} />
				<TextField className={classes.form} name="teamName" label="Team Name" variant="outlined" onChange={handleChange} />
				<Button className={classes.form} variant="contained" color="primary" onClick={handleClick}>
					Play
				</Button>
			</form>
		</div>
	);
}

export default StagingArea;
