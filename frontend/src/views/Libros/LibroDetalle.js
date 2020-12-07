import React, {useState, useEffect} from 'react'
import { Paper, makeStyles, IconButton, Grid, Typography, Container} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Alert } from '@material-ui/lab';

const max_width = '100%'

const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        background: '#FFFCEF',
        width: max_width,
    },
    container: {
      marginTop: "10px",
      background: '#F5F4DF',
      align: 'center',
      width: max_width,
    }
  }))

const initialValues = {
    idLibro: '',
    titulo: '',
    autor: '',
    editorial: '',
    edicion: '',
    condicion: '',
    precio_oroginal: '',

}

export default function LibroDetalle(props) {
    const classes = useStyle();
    const [values, setValues] = useState(initialValues);


    useEffect(() => {
        axios.get('http://localhost:8000/api/libros/' + props.idLibro)
        .then( res => {
            console.log(res.data[0])
            setValues(res.data[0])
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    console.log(values)
    return (
        <div className={classes.container}>
            <div>
            <Paper className={classes.pageContent}>
                <Link variant="body2" to="/libros">
                <IconButton color="primary" aria-label="edit">
                    <ArrowBackIcon/>
                </IconButton>
                </Link>
                <Grid container spacing='3' justify="space-between">
            <Grid item xs={6}> 
            <Typography variant="h3" gutterBottom>
                {values.titulo}
            </Typography>
            </Grid>
            <br/><br/><br/><br/><br/><br/>
        </Grid>
        <Grid container spacing='1'> 
            <Grid item xs={12}> 
            <Typography variant="subtitle1" >
                Autor: {values.autor}
            </Typography>
            </Grid>
            <Grid item xs={12}> 
            <Typography variant="subtitle1" gutterBottom>
                Editorial: {values.editorial}
            </Typography>
            </Grid>
            <Grid item xs={12}> 
            <Typography variant="subtitle1" >
                Condicion: {values.condicion}
            </Typography>
            </Grid>
            <Grid item xs={12}> 
            <Typography variant="subtitle1" >
                Precio Original:  ${values.precio_original}
            </Typography>
            </Grid>
            <Grid item xs={12}> 
            <Typography variant="subtitle1" >
                Precio Por el libro:  ${values.precio_original}
            </Typography>
            </Grid>
          </Grid>
          <br/>
           <Alert> ¿Te interesó este Libro? Contacta al +52 442 870 9075 para mas información</Alert>
        </Paper>
            </div>
        </div>
    )
}
