import React, { Component } from 'react'
//import { Link } from '@material-ui/core';

// Mat stuff
import Appbar from '@material-ui/core/AppBar' // <--- compile each part separately for speeeed
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

let Link = require("react-router-dom").Link  // <-- other version

const style = {
    borderRadius: "15px",
    width: "99%",
    marginTop: ".5%",
    marginBottom: ".5%",
    marginRight: ".5%",
    // backgroundColor: "#cccccc"
    
}

class Navbar extends Component {
    render() {
        return (
           
            <Appbar  style={style} >
            
                <Toolbar className="nav-container" >

                    <Button color='inherit' component={Link} to='/'> Home</Button>
                    <Button color='inherit' component={Link} to='/signup'> Sign Up</Button>
                    <Button color='inherit' component={Link} to='/signin'> Sign In</Button>
                    
                </Toolbar>
            </Appbar>
        
        )
    }
}

export default Navbar
