export default {
    palette: {
      primary: {
        light:'#4dabf5',
        dark:'#1769aa',
        main:'#2196f3',
        contrastText:'#ffffff' 
      },
      secondary: {
        light:'#f73378',
        dark:'#ab003c',
        main:'#f50057',
        contrastText:'#ffffff' 
      }
    },
    spread: {
        typography: {
        useNextVarients: true
        },
        form: {
            textAlign: 'center'
        },
        image: {
            margin: 'auto 10px auto 10px',
            height: 50
        },
        button: {
            margin: '20px auto 20px auto',
            position: "relative"
        },
        textField: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '20px auto 20px auto'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            margin: 10
        },
        progress: {
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        }
    }
    
  }