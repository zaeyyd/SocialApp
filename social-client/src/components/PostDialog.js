import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom'

//MUI 
import { DialogTitle, DialogContent, TextField, Button, Dialog, CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//ICONS
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
//Redux

import { connect } from 'react-redux'
import { getPost } from '../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spread,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
       
    },
    dialogContent:{
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    }
})

class PostDialog extends Component{
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getPost(this.props.postID)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render(){
        const { classes, post: { postID, body, createTime, likeCount, commentCount, userIMG, userAT}, UI: { loading }}
        = this.props

        const dialogMarkup = loading ? (
            <CircularProgress size={200}/>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userIMG} alt="Profile" className={classes.profileImage}/>
                </Grid>

                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userAT}`}>
                        @{userAT}
                    </Typography>

                    <hr className={classes.invisibleSeparator}/>

                    <Typography variant="body2" color="textSecondary" >
                        {dayjs(createTime).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>

                    <Typography variant="body1">
                        {body}
                    </Typography>
                </Grid>
            </Grid>
        )
    
        return (
            <Fragment> 
                <MyButton onClick={this.handleOpen} tip="Expand" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/> 
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>

                    <DialogContent
                        className={classes.dialogContent}>

                            {dialogMarkup}

                    </DialogContent>

                </Dialog>
            </Fragment>
        )
    }

    
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
    userAT: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
})

const mapActionsToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))