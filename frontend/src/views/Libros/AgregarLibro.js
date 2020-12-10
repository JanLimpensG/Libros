import React from "react";
import { Paper, makeStyles, Container } from '@material-ui/core';
import AgregarLibroForm from './AgregarLibroForm';
import Sidenav from "../../Nav/Sidenav";


const width_proportion = '100%';

const useStyle = makeStyles(theme => ({
  pageContent:{
      margin: theme.spacing(1),  
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(0),
      width: width_proportion
  },
  container: {
    display: "flex",
    marginTop: "50px",
    background: '#F5F4DF',
    height: 1080
  }
}))


const AgregarLibro = (props) => {
  const classes = useStyle();


console.log(props)
    return (
      <div className={classes.container}>
        <Sidenav titulo="Editar Libro"/>   
          <div className={classes.pageContent}>            
            <AgregarLibroForm history={props.history} idLibro={props.match.params.idLibro}/>
          </div>
      </div>
    );

}

export default AgregarLibro;
