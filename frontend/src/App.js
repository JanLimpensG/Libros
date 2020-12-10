import React from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme.config'

import Home from './views/Home';
import Libros from './views/Libros/Libros';
import Libro from './views/Libros/Libro'
import EditarLibro from './views/Libros/EditarLibro';
import AgregarLibro from './views/Libros/AgregarLibro';


function App() {
  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/libros" exact={true} component={Libros}/>
        <Route path="/libro/:idLibro([0-9]*)" exact={true} component={Libro}/>
        <Route path="/libro/editar/:idLibro([0-9]*)" exact={true} component={EditarLibro}/>
        <Route path="/libro/agregar" exact={true} component={AgregarLibro}/>
        <Route path="/login" exact={true} component={Home}/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
