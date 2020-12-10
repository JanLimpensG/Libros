import React from "react";
import { Paper, makeStyles, Container } from '@material-ui/core';
import LibrosBuscar from './LibrosBuscar';
import Sidenav from "../../Nav/Sidenav";
import Mensaje from '../../Components/Mensaje';


const width_proportion = '100%';

const useStyle = makeStyles(theme => ({
  pageContent:{
      margin: theme.spacing(5),
      padding: theme.spacing(3),
      width: width_proportion
  },
  container: {
    display: "flex",
    marginTop: "40px",
    background: '#F5F4DF'
  }
}))


const Libros = (props) => {
  const classes = useStyle();

  const args = props.location.search;

    return (
      <div className={classes.container}>
        <Sidenav titulo="Libros"/>   
          <div className={classes.pageContent}>            
            <LibrosBuscar history={props.history}/>
          </div>

          <Mensaje 
        success={args.includes("agregarLibro") ? args.slice(-1) : -1} 
        mensajeExito={"Se agregó correctamente el libro."}
        mensajeError={"Hubo un error al agregar el libro."}
        />

      </div>
    );

}

export default Libros;
