import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { logOutUser, uploadImage } from '../redux/actions/userActions'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'

import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import { Paper, IconButton, Icon } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'


import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LogOutIcon from '@material-ui/icons/ExitToApp'



const styles =  (theme) => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  })

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
        // send to firebase
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById("imgInput")
        fileInput.click()
    }

    handleLogOut = () => {
      this.props.logOutUser()
    }

    render() {
            const { classes, 
                user: { credentials: 
                    { AT, 
                    createTime, 
                    imgURL, 
                    bio, 
                    website, 
                    location}, 
                    loading, 
                    authenticated}} = this.props
        
            let profileMarkup = !loading ? (authenticated ? (
                <Paper className={classes.paper}> 
                    <div className={classes.profile}>
                        <div className="image-wrapper">

                          <Tooltip title="Change Photo" placement="top">
                            <a onClick={this.handleEditPicture}>
                              <img src={imgURL} className="profile-image" alt='profile image'/>
                            </a> 
                          </Tooltip>

                          <input 
                            type="file" 
                            id="imgInput" 
                            onChange={this.handleImageChange}
                            hidden='hidden'
                          />
                
                        </div>
                        <hr/>

                        <div className="profile-details">
                            <MuiLink component={Link} to={`/users/${AT}`} color="primary" variant="h5">
                                @{AT}

                            </MuiLink>
                            <hr/>

                            {bio && <Typography variant="body2"> {bio} </Typography>}
                            <hr/>
                            {location && ( // not 100%
                                <Fragment> 
                                    <LocationOn color="primary"/>
                                    <span>{location}</span>
                                    <hr/>
                                </Fragment>
                                
                            )}

                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary"/>
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        { ' ' }{website}
                                    </a>
                                    <hr/>

                                </Fragment>
                            )}
                            <CalendarToday color="primary"/> {' '}
                            <span>Joined {dayjs(createTime).format('MMM YYYY')}</span>
                        </div>

                        <MyButton tip="Logout" onClick={this.handleLogOut} >
                          <LogOutIcon color="primary"/>
                        </MyButton>


                        <EditDetails/>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant='body2' align="center">
                        No profile found, sign in again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/signin">
                            Sign In
                        </Button>
                        <Button variant="contained" color="Secondary" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </div>
                </Paper>

            )) : (<p> loading </p>)

            return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {logOutUser, uploadImage}

Profile.propTypes = {
    logOutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
