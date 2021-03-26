import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import Background from '../assets/26842.jpg';
import { green, purple } from '@material-ui/core/colors';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Grid,
  Button,
  Divider,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
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
    color: 'white',
    backgroundColor: '#94aa8a',
    '&:hover': {
      backgroundColor: '#7b8e72',
      borderColor: '#7b8e72',
      boxShadow: 'none',
    },
    boxShadow: 'none',
    borderColor: '#94aa8a',
  }
});

class Main extends React.Component {

  render() {
    const { classes} = this.props;

    return (
      <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.header}>
              <div className={classes.paper}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={() => this.props.history.push('/')}
                >
                  Consultar
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  startIcon={<FavoriteBorderIcon />}
                  onClick={() => this.props.history.push('/favorite')}
                >
                  Favoritos
                </Button>
              </div>
            </Grid>
          </Grid>
          <Divider style={{marginBottom: 40}} />
          <Grid container spacing={3} style={{padding: 20}}>
            {this.props.children}
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Main));
