import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {
  Typography,
  Grid,
  Button,
  Avatar
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

class Person extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: {},
      altrow: {},
      filmsById: []
    }

  }

  componentDidMount() {

    // get the parameter ID from Router link
		let id = this.props.match.params.id;

    // has few movies then put in local database
    axios.get('https://swapi.dev/api/films')
    .then((response) => {
      let filmsById = [];
      for(let item of response.data.results) {
        filmsById[item.episode_id] = item;
      }
      this.setState({filmsById});
    })
    .catch(error => console.log(error));

    // get people by id
    axios.get('https://swapi.dev/api/people/'+id)
    .then((response) => {
      this.setState({row: response.data});
    })
    .catch(error => console.log(error));

    // get people by id
    axios.get('https://akabab.github.io/starwars-api/api/id/'+ id +'.json')
    .then((response) => {
      this.setState({altrow: response.data});
    })
    .catch(error => console.log(error));

  }

  save(data) {
    // put people data
    data.id = this.props.match.params.id;
    axios.put('http://starwars.soware.com.br:8000/people', data)
    .then((response) => {
      console.log('saved:', response);
    })
    .catch(error => console.log(error));
  }

  render() {
    const { classes} = this.props;
    let films = null;

    if (this.state.filmsById.length > 0 && this.state.row.films) {
      films = this.state.row.films.map((film, key)=>{
        let film_idx = parseInt(film.match(/\d+/)[0]);
        return(
          <Typography key={key} variant="body2">{this.state.filmsById[film_idx].title}</Typography>
        );
      });
    }

    return (
      <>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography variant={'h5'}>Detalhes do personagem</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid container item xs={4} justify="center" direction="column" alignItems="center">
              <Avatar alt="Remy Sharp" style={{width: 140, height: 140}} src={this.state.altrow.image} />
              <Typography variant={'h4'} style={{marginTop: 10}}>{this.state.row.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{marginBottom: 10}} variant={'h6'}>Informations</Typography>
              <Typography>Gender: {this.state.row.gender}</Typography>
              <Typography>Height: {this.state.row.height} cm</Typography>
              <Typography>Mass: {this.state.row.mass} Kg</Typography>
              <Typography>Hair color: {this.state.row.hair_color}</Typography>
              <Typography>Skin color: {this.state.row.skin_color}</Typography>
              <Typography>Eye color: {this.state.row.eye_color}</Typography>
              <Typography>Birth Year: {this.state.row.birth_year}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{marginBottom: 10}} variant={'h6'}>Films</Typography>
              {films}
            </Grid>
            <Grid item xs={2}>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => {
                this.save(this.state.row);
                this.props.history.push('/');
              }}>
                Salvar
              </Button>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => {
                this.props.history.go(-1);
              }}>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Person));
