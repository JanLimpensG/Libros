import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Paper, TableHead, Toolbar, Tooltip, Typography } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { Alert } from "@material-ui/lab";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'titulo', numeric: false, disablePadding: true, label: 'Título' },
    { id: 'autor', numeric: false, disablePadding: false, label: 'Autor' },
    { id: 'editorial', numeric: false, disablePadding: false, label: 'Editorial' },
    { id: 'edicion', numeric: false, disablePadding: false, label: 'Edición' },
    { id: 'condicion', numeric: false, disablePadding: false, label: 'Condiciones' },
    { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' }
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
};


return (
    <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
            <TableCell 
                key={headCell.id}
                align='center'
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
        </TableRow>
    </TableHead>
);
}



EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },

    
    title: {
        flex: '1 1 100%',
    },
    }));


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
    <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Tabla de Libros
        </Typography>
        <Tooltip title="Quitar Filtros">
            <IconButton onClick={props.sinFiltro}aria-label="filter list">
                <FilterListIcon />
            </IconButton>
        </Tooltip>
    </Toolbar>
    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
                background: '#FFFCEF'
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function LibrosTabla(props) {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const sinFiltro = (event) => {
        props.sinFiltro();
        handleRequestSort(event, 'sin filtro');
    }

    let libros = props.data

    libros = props.titulo ? libros.filter(x => x['titulo'].toLowerCase().includes(props.titulo.toLowerCase())) : libros;

    libros = props.autor ? libros.filter(x => x['autor'].toLowerCase().includes(props.autor.toLowerCase())) : libros;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const setPage = (event, newPage) => {
            props.setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        props.setPage(0);
    };

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar sinFiltro={sinFiltro}/>
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={libros.length}
                />
                <TableBody>
                {
                    libros.length === 0 && props.retrieve == 0 && (
                        <TableCell colSpan={5}>
                            <Alert severity="info">No se encontró ningún libro con estas características.</Alert>
                        </TableCell>
                    )
                }
                {stableSort(libros, getComparator(order, orderBy))
                    .slice(props.page * rowsPerPage, props.page * rowsPerPage + rowsPerPage)
                    .map((libro) => {
                    return (
                        <TableRow
                        hover
                        tabIndex={-1}
                        key={libro.idLibro}
                        >
                            {/*Modificar para acceder a libro*/}
                            <TableCell align="center" 
                            style={{cursor:'pointer'}} 
                            onClick={
                                () => props.url.push("/libro/" + libro.idLibro)
                                }>
                                {libro.titulo}
                            </TableCell>


                            <TableCell align="center">{libro.autor}</TableCell>
                            <TableCell align="center">{libro.editorial}</TableCell>
                            <TableCell align="center">{libro.edicion}</TableCell>
                            <TableCell align="center">{libro.condicion}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="Editar libro" arrow>
                                    <IconButton>
                                        <EditIcon  onClick={() => props.url.push("/libro/editar/" + libro.idLibro)}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar libro" arrow>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                
                            </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={libros.length}
            rowsPerPage={rowsPerPage}
            
            page={props.page}
            labelRowsPerPage="Registros por página"
            onChangePage={setPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    )
}
