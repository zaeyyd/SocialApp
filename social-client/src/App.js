import React, { Component } from 'react'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import './App.css'
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'


//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHED } from './redux/types'
import { logOutUser, getUserData } from './redux/actions/userActions'


// components
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'
import themeFile from './util/theme'
// pages
import home from './pages/home'
import signIn from './pages/signIn'
import signUp from './pages/signUp'
import user from './pages/user'
import Axios from 'axios'




const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken

Axios.defaults.baseURL = "https://us-central1-socialapp1265.cloudfunctions.net/api"




if(token){
   const decodedToken = jwtDecode(token)

  
 if(decodedToken.exp * 1000 < Date.now() ){ 
    store.dispatch(logOutUser())
    window.location.href = "/signin"
  }
  else{ 
     store.dispatch({ type: SET_AUTHED})
     Axios.defaults.headers.common['Authorization'] = token
     store.dispatch(getUserData())
   }
}

class App extends Component {
  render(){
    return(
      <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          
          <Navbar/>

          <div className="container">
            <Switch>
             <Route  exact path= "/" component={home}/>
             <AuthRoute  exact path= "/signin" component={signIn} />
             <AuthRoute  exact path= '/signup' component={signUp} />
             <Route exact path='/users/:AT' component={user}/>
             <Route exact path="/users/:AT/post/:postID" component={user}/>
            </Switch>
          </div>
 

          
        </Router>
      </div>
      </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App