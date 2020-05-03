import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'


import Appbar from '@material-ui/core/AppBar' 
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

import MakePost from '../post/MakePost'



const style = {
    borderRadius: "5px",
    width: "99%",
    marginTop: ".5%",
    marginBottom: ".5%",
    marginRight: ".5%",

    
}

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
           
            <Appbar style={style} >
            
                <Toolbar className="nav-container" >

                    { authenticated ? (
                        <Fragment>

                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>


                            <MakePost/>


                            <MyButton tip='Notifications'>
                                <NotificationsIcon />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>

                        <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                        </Link>     
                        <Button color='inherit' component={Link} to='/signup'> Sign Up</Button>
                        <Button color='inherit' component={Link} to='/signin'> Sign In</Button>
                        </Fragment>
                    )}
                    
                </Toolbar>
            </Appbar>
        
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
