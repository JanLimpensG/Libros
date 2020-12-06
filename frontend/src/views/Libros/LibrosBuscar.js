import React, { Component } from 'react'
import LibrosService from '../../Services/LibrosService';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl, InputAdornment, TextField } from '@material-ui/core';
import LibrosTabla from './LibrosTabla'


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
        LibrosService.getAll()
            .then(libros => {
                this.setState({libros: libros.data.data});
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
                    justifyContent: "center",
                    margin: " 40px 40px 20px 40px",
                }}>
                    <FormControl style={{width: "50%"}}>
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
                    justifyContent: "center",
                    margin: " 40px 40px 20px 40px",
                }}>
                     <FormControl style={{width: "50%"}}>
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
                <div >
                    <LibrosTabla /> 
                </div>
                
            </div>
        )
    }
}
