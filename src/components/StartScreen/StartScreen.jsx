import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import gameStateContext from "../../context/GameContext";
import { socket } from "../../context/SocketContext";

const useStyles = makeStyles(theme => ({
	root: {
		width: 300,
		padding: 100,
		margin: "0 30%",
	},
	form: {
		margin: "0 0 20px 0px",
		width: 245,
	},
}));

function StartScreen() {
	const classes = useStyles();
	const history = useHistory();
	const { gameState, setGameState } = useContext(gameStateContext);

	const handleCreate = async () => {
		await setGameState(prevValues => {
			return {
				...prevValues,
				code: socket.id,
			};
		});
		await socket.emit("createRoom", JSON.stringify(gameState));
		await history.push("/staging/" + socket.id);
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setGameState(prevValues => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	};

	const handleJoin = () => {
		const { code } = gameState;
		if (code) {
			history.push("/staging/" + code);
		} else {
			alert("please enter valid code");
		}
	};

	return (
		<div className={classes.root}>
			<h1>Auction Game</h1>
			<Button className={classes.form} variant="contained" color="primary" onClick={handleCreate}>
				Create Game
			</Button>
			<Typography className={classes.form}>Or</Typography>
			<TextField className={classes.form} name="code" label="Game Code" variant="outlined" onChange={handleChange} />
			<Button className={classes.form} variant="contained" color="primary" onClick={handleJoin}>
				Join Game
			</Button>
		</div>
	);
}

export default StartScreen;
