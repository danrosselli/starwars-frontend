import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import {
  Typography,
  Grid,
  Button,
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

class Favorite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }

  componentDidMount() {

    // get all people
    axios.get('http://starwars.soware.com.br:8000/people')
    .then((response) => {
      this.setState({rows: response.data});
    })
    .catch(error => console.log(error));

  }

  delete(id) {
    // get all people
    axios.delete('http://starwars.soware.com.br:8000/people/' + id)
    .then((response) => {
      console.log(response);

    })
    .catch(error => console.log(error));
  }

  render() {
    const { classes} = this.props;

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'gender', headerName: 'Gender', width: 130 },
      { field: 'height', headerName: 'Height', width: 130 },
      { field: 'mass', headerName: 'Mass', width: 130 },
      { field: 'skin_color', headerName: 'Skin color', width: 130 },
      { field: 'hair_color', headerName: 'Hair color', width: 130 },
      { field: 'birth_year', headerName: 'Birth year', width: 130 },
      {
        field: '',
        width: 250,
        renderCell: (params: GridCellParams) => (
          <strong>
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }} onClick={(value) => {
              this.props.history.push('/person/' + params.row.id);
            }}>
              Detalhes
            </Button>
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }} onClick={(value) => {
              let rows = [... this.state.rows];
              rows.splice(params.rowIndex, 1);
              this.setState({rows});
              this.delete(params.row.id);
            }}>
              Apagar
            </Button>
          </strong>
        ),
        renderHeader: (params: GridColParams) => (<strong></strong>),
      },
    ];

    return (
      <>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography variant={'h5'}>Meus favoritos</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid rows={this.state.rows} columns={columns} autoHeight pageSize={5} disableColumnMenu={true} />
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Favorite));
