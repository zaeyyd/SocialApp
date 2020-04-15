import React from 'react'
import { Route, Redirect} from 'react-router-dom'

const AuthRoute = ({component: Component, authenticated, ...rest}) => ( // why smooth here??
    <Route 
    {...rest}
    render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/> 
    }
    />

)


export default AuthRoute