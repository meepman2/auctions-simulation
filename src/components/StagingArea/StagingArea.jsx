import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
import { socket } from "../../context/SocketContext";

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
	const history = useHistory();
	const location = useLocation();

	const handleClick = () => {
		socket.emit("startGame", "start");
		history.push("/map/" + location.pathname.substring(9, 29));
	};

	return (
		<div className={classes.root}>
			<div>
				<h1 className={classes.form}>Your game code is:{location.pathname.substring(9, 29)}</h1>
			</div>
			<form>
				<Button className={classes.form} variant="contained" color="primary" onClick={handleClick}>
					Play
				</Button>
			</form>
		</div>
	);
}

export default StagingArea;
