import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#78C1CC',
            dark: '#5A9199',
            light: '#DDE4E5',
        },
        secondary:
        {
            main: '#F87C7C',
            dark: '#572B2B',
            light: '#E37171',
            contrastText: '#fff',
        }
    },
    
})

export default theme;