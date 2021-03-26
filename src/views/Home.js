import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import {
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  Divider,
  InputAdornment
} from '@material-ui/core';

const styles = theme => ({
  search: {
    width: '80%',
    marginBottom: 16
  }
});

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      personas: null,
      inputSearch: ''
    }

    this.database = {films: []};

  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    // has few movies then put in local database
    axios.get('https://swapi.dev/api/films')
    .then((response) => {
      for(let item of response.data.results) {
        this.database.films[item.episode_id] = item;
      }
    })
    .catch(error => console.log(error));
  }

  search(value) {

    if (value.length > 0) {

      axios.get('https://swapi.dev/api/people/?search='+value)
      .then((response) => {
        //console.log('data received:', response.data);

        //correct the lag problem in autocomplete using remote API
        if(this.state.inputSearch.length > 0) {
          this.setState({personas: response.data.results});
        }

      })
      .catch(error => console.log(error));

    } else {
      this.setState({personas: null});
    }

  }

  handleInputSearch(e) {
    this.setState({inputSearch: e.target.value});
    this.search(e.target.value);
  }

  render() {
    const { classes} = this.props;

    let personas = null;
    if (this.state.personas) {
      personas = this.state.personas.map((item, idx) => {
        //map films
        let films = null;
        if (this.database.films) {
          films = item.films.map((film, key)=>{
            let film_idx = parseInt(film.match(/\d+/)[0]);
            return(
              <Typography key={key} variant="body2">{this.database.films[film_idx].title}</Typography>
            );

          });
        }

        return(
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3} xl={2} >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">{item.name}</Typography>
                <Typography component="p" color="textSecondary">{item.gender}, {item.height} cm, {item.mass} Kg</Typography>
                <Divider style={{marginTop: 8, marginBottom: 10}} />
                <Grid container>
                  <Grid item xs={3}>
                    <Typography gutterBottom variant="subtitle2">Films</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <div>{films}</div>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(e) => {
                  let id_person = parseInt(item.url.match(/\d+/)[0]);
                  this.props.history.push('/person/' + id_person);
                }}>Ver detalhes</Button>
              </CardActions>
            </Card>
          </Grid>

        );
      });

    }

    return (
      <>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography variant={'h5'}>Procure os personagens de Star Wars</Typography>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <TextField id="inputSearch"
            className={classes.search}
            label="Procurar"
            variant="outlined"
            value={this.state.inputSearch}
            onChange={e => this.handleInputSearch(e)}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {personas}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
