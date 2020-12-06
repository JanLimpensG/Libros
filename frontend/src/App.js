import React from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme.config'

import Home from './views/Home';
import Libros from './views/Libros/Libros';


function App() {
  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/libros" exact={true} component={Libros}/>
        <Route path="/login" exact={true} component={Home}/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
