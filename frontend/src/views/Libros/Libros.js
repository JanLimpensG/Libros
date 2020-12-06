import React from "react";
import { Paper, makeStyles, Container } from '@material-ui/core';
import LibrosBuscar from './LibrosBuscar';
import Sidenav from "../../Nav/Sidenav";


const width_proportion = '100%';

const useStyle = makeStyles(theme => ({
  pageContent:{
      margin: theme.spacing(5),
      padding: theme.spacing(3),
      width: width_proportion
  },
  container: {
    display: "flex",
    marginTop: "40px"
  }
}))


const Libros = (props) => {
  const classes = useStyle();



    return (
      <div className={classes.container}>
        <Sidenav titulo="Libros"/>   
          <div className={classes.pageContent}>            
            <LibrosBuscar history={props.history}/>
          </div>
      </div>
    );

}

export default Libros;
