import React, { Fragment } from 'react'
import defaultImg from '../images/no-img.png'
import PropTypes from 'prop-types'
//MUI
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    ...theme.spread,
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
      },
    card: {
        display: 'flex',
        marginBottom: 20,

    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    AT: {
        width: 60,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        margin: '0 auto 7px auto',
        borderRadius: '10rem'
    },
    data: {
        height: 15,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.2)',
        marginBottom: 10,
        borderRadius: '10rem'
    },
    fullLine: {
        height: 15,
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.2)',
        marginBottom: 10,
        borderRadius: '10rem'
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.2)',
        marginBottom: 10,
        borderRadius: '10rem'

    }

})

const ProfileSkeleton = (props) => {
    const { classes } = props

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={defaultImg} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.AT}/>

                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    
                    <hr/>

                </div>
            </div>
        </Paper>
    )

}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)