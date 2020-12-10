import React, { Component } from 'react'
import LibrosService from '../../Services/LibrosService';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import LibrosTabla from './LibrosTabla'
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';




export default class LibrosBuscar extends Component {

    constructor(props)
    {
        super(props);
        this.retrieveLibros = this.retrieveLibros.bind(this);
        this.setPage = this.setPage.bind(this)
        this.sinFiltro = this.sinFiltro.bind(this);
        
        this.state = {
            libros: [],
            filtrarPorAutor:'', 
            filtrarPorTitulo:'',
            page: 0,
            history: props.history,
            retrieve: -1,
        };
        
    }

    componentDidMount() {
        this.retrieveLibros();
    }

    retrieveLibros() {
        axios.get('http://localhost:8000/api/libros')
            .then(libros => {
                console.log(libros)
                this.setState({libros: libros.data});
                this.setState({retrieve: 0});
            })
            .catch((e) => {
                console.log(e);
            })
    }

    setPage(newPage)
    {
        this.setState({page: newPage});
    }

    handleTituloChange = (event) => {
        this.setState({filtrarPorTitulo: event.target.value});
        this.setPage(0);
    };

    handleAutorChange = (event) => {
        this.setState({filtrarPorAutor: event.target.value});
        this.setPage(0);
    };

    sinFiltro()
    {
        this.setState({filtrarPorAutor: ''});
        this.setState({filtrarPorTitulo: ''});
        this.setPage(0);
    }

    render() {
        console.log(this.state)
        const {
            libros,
            filtrarPorAutor,
            filtrarPorTitulo,
            page,
            history,
        } = this.state

        return (
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: " 40px 40px 20px 40px",
                }}>
                    <FormControl style={{width: "80%"}}>
                        <TextField 
                            label="Titulo"
                            value={this.state.filtrarPorTitulo}
                            onChange={this.handleTituloChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: " 40px 40px 20px 40px",
                }}>
                     <FormControl style={{width: "80%"}}>
                        <TextField 
                            label="Autor"
                            value={this.state.filtrarPorAutor}
                            onChange={this.handleAutorChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </div>
                <Grid container justify='flex-end' spacing={12}>
                <Fab color="primary" aria-label="add" onClick={ () => history.push('/libro/agregar')}>
                    <AddIcon />
                </Fab>
                </Grid>
                
                <div >
                    <LibrosTabla 
                        titulo = {filtrarPorTitulo}
                        autor = {filtrarPorAutor} 
                        data={libros}
                        setPage={this.setPage}
                        page={page}
                        url={history}
                        sinFiltro={this.sinFiltro}
                        retrieve={this.state.retrieve}                   
                    /> 
                </div>
                
            </div>
        )
    }
}
