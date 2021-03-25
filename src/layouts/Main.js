import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Grid,
  Button,
  Divider
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
  button: {
    margin: theme.spacing(2),
  }
});

class Main extends React.Component {

  render() {
    const { classes} = this.props;

    return (
      <div className={classes.root}>
        {/*
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Star Wars!
            </Typography>
          </Toolbar>
        </AppBar>
        */}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Button className={classes.button} variant="contained" color="primary" onClick={() => {
                  this.props.history.push('/');
                }}>
                  Consultar
                </Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={() => {
                  this.props.history.push('/favorite');
                }}>
                  Favoritos
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={3} style={{padding: 20}}>
            {this.props.children}
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Main));
