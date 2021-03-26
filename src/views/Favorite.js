import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import {API_URL} from '../Config';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "white"
    },
    "& .MuiDataGrid-cell": {
      backgroundColor: "white"
    },
    "& .MuiDataGrid-footer": {
      backgroundColor: "white"
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none"
    }
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
    axios.get(API_URL + '/people')
    .then((response) => {
      this.setState({rows: response.data});
    })
    .catch(error => console.log(error));

  }

  delete(id) {
    // get all people
    axios.delete(API_URL + '/people/' + id)
    .then((response) => {
      console.log(response);

    })
    .catch(error => console.log(error));
  }

  render() {
    const { classes} = this.props;

    const columns = [
      { field: 'id', headerName: 'ID', width: 70, hide:true },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'gender', headerName: 'Gender', width: 130 },
      { field: 'height', headerName: 'Height', width: 130 },
      { field: 'mass', headerName: 'Mass', width: 130 },
      { field: 'skin_color', headerName: 'Skin color', width: 130 },
      { field: 'hair_color', headerName: 'Hair color', width: 130 },
      { field: 'birth_year', headerName: 'Birth year', width: 130 },
      {
        field: '',
        width: 300,
        renderCell: (params: GridCellParams) => (
          <strong>
            <Button
              variant="outlined"
              color="default"
              size="small"
              style={{ marginLeft: 16 }}
              startIcon={<DetailsIcon />}
              onClick={(value) => {
                this.props.history.push('/person/' + params.row.id);
              }}
            >
              Detalhes
            </Button>
            <Button
              variant="outlined"
              color="default"
              size="small"
              style={{ marginLeft: 16 }}
              startIcon={<DeleteOutlineIcon />}
              onClick={(value) => {
                let rows = [... this.state.rows];
                rows.splice(params.rowIndex, 1);
                this.setState({rows});
                this.delete(params.row.id);
              }}
            >
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
          <DataGrid
            rows={this.state.rows}
            columns={columns}
            autoHeight
            pageSize={6}
            disableColumnMenu
            disableSelectionOnClick
            className={classes.root}
          />
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Favorite));
