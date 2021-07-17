import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        margin: "0 auto",
    },
}));

function RulesCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Rules"
                action={
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </IconButton>
                }></CardHeader>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        You can choose from the below 3 moves in each turn.
                        <p>1. <span style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Buy</span> an item</p>
                        <p>2. <span style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Sell</span> an item to the expert</p>
                        <p>3. <span style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Travel</span> to a different country</p>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RulesCard;
