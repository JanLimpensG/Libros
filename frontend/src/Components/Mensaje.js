import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Mensaje = (props) => {
    const [open, setOpen] = React.useState('');
    const [success, setSuccess] = React.useState(props.success);

    const mensajeExito = props.mensajeExito;
    const mensajeError = props.mensajeError;
    
    useEffect ( () => {
        if(success !== '')
            setOpen(true);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <div>
        {   success !== -1 ?
            <Snackbar open={open ? true : false} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={success == 1 ? "success" : "error"}>
                    {success == 1 ? mensajeExito : mensajeError}
                </MuiAlert>
            </Snackbar>
            :
            <p></p>
        }
        </div>
    );


}

export default Mensaje;