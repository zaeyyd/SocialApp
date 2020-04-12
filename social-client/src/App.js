import React, { Component } from 'react'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import './App.css'
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


// components
import Navbar from './components/Navbar'
// pages
import home from './pages/home'
import signIn from './pages/signIn'
import signUp from './pages/signUp'



const theme = createMuiTheme({
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
  typography: {
    useNextVarients: true
  }
  
})
class App extends Component {
  render(){
    return(
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          
          <Navbar/>

          <div className="container">
            <Switch>
             <Route  exact path= "/" component={home}/>
             <Route  exact path= "/signin" component={signIn}/>
             <Route  exact path= '/signup' component={signUp}/>
            </Switch>
          </div>
 

          
        </Router>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App