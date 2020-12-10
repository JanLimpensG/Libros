import React, {useState, useEffect} from 'react'
import {CssBaseline, Grid, makeStyles, Paper} from '@material-ui/core';
import Axios from 'axios';
import Controls from '../../Components/Controls'


const condicionItems = [
    {id:'Buena', title: 'Buena'},
    {id:'Mala', title: 'Mala'}
]

const initialValues = {
    titulo: '',
    autor: '',
    editorial: 'H',
    editorial: '',
    edicion: '',
    condicion: '',
    precio_original: 0,
}




const useStyle = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(1),  
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),  
      },
    container: {
      display: "flex",
      marginTop: "50px",
      background: '#F5F4DF',
    }, 
    form: {
        margin: theme.spacing(1),  
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4), 
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: "50px",
        background: '#F5F4DF',
},
root:{
    '& .MuiFormControl-root' :{
        width: '90%',
        margin: theme.spacing(1),
    } 
 },
  }))


export default function EditarLibroForm(props) {

    const[values, setValues] = useState(initialValues);
    const[errors, setErrors] = useState({});
    const classes = useStyle();


    const handleInputChange= e => {
        const {name , value} = e.target
        setValues({
            ...values,
            [name]:value 
        })
    }

    useEffect ( () => {

        Axios.get('http://localhost:8000/api/libros/'+ props.idLibro)
        .then(res => { setValues (res.data[0])
    })
        .catch((e) => {
            console.log(e)
        })
    }, []);


    const onSubmit = (e) => {

        e.preventDefault();

        Axios.put('http://localhost:8000/api/libros/' + props.idLibro, values)
            .then(res => {
                props.history.push("/libro/"+ props.idLibro +"?editarLibro=1");
            })
            .catch( e => {
                console.log(e);
                props.history.push("/libro/"+ props.idLibro +"?editarLibro=0");
            })
    }

    console.log(values);
    return (
        <div  className={classes.form}>
        <CssBaseline/>
        <form className={classes.root}>
            <Grid container spacing={3} >
                <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        name="titulo" 
                        label="Titulo del Libro *" 
                        value={values.titulo}
                        onChange = {handleInputChange}
                        error={errors.nombre}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        label="Autor *"
                        name="autor"
                        value={values.autor}
                        onChange = {handleInputChange}
                        error={errors.telefono}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        label="Editorial"
                        name="editorial"
                        value={values.editorial}
                        onChange = {handleInputChange}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        label="Edicion"
                        name="edicion"
                        value={values.edicion}
                        onChange = {handleInputChange}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.RadioGroup 
                        name = "condicion"
                        label="Condicion *"
                        value={values.condicion}
                        items={condicionItems}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        label="Precio Original *"
                        name="precio_original"
                        value={values.precio_original}
                        onChange = {handleInputChange}
                    />
                    </Grid>
                    <Grid item sm={12}>
                        <Controls.Button
                        text="Submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        onClick={onSubmit}
                         />
                    </Grid>
            </Grid>
        </form>
        </div>
    )
}
