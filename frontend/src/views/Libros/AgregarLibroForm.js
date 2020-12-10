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
    condicion: 'Buena',
    precio_original: '',
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



    const validate = () => {
        let temp = {}
        temp.titulo = values.titulo?"":"Este campo es requerido"
        temp.autor = values.autor?"":"Este campo es requerido"
        temp.precio_original = values.precio_original?"":"Este campo es requerido"
        setErrors({
            ...temp
        })
  
        return Object.values(temp).every(x => x == "")
    }


    const handleInputChange= e => {
        const {name , value} = e.target
        setValues({
            ...values,
            [name]:value 
        })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if(validate()){
            Axios.post('http://localhost:8000/api/libros', values)
            .then(res => {
                props.history.push("/libros"+"?agregarLibro=1");
            })
            .catch( e => {
                console.log(e);
                props.history.push("/libros"+"?agregarLibro=0");
            })
        } else {

        }

        
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
                        error={errors.titulo}
                    />
                    </Grid>
                    <Grid item sm={12}>
                    <Controls.Input 
                        variant="outlined"
                        label="Autor *"
                        name="autor"
                        value={values.autor}
                        onChange = {handleInputChange}
                        error={errors.autor}
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
                        error={errors.autor}
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
