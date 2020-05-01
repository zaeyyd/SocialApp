import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom'

//MUI 
import { DialogContent, Dialog, CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//ICONS
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//Redux

import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/dataActions'
import LikeButton from './LikeButton'

import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = theme => ({
    ...theme.spread,
    
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
        left: '90%',
        marginTop: '10px'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
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
        const { classes, post: { postID, body, createTime, likeCount, commentCount, userIMG, userAT, comments}, UI: { loading }}
        = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}> <CircularProgress size={200} thickness={2}/>
            </div>
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

                    <LikeButton postID={postID}/>
                    <span>{likeCount} likes</span>

                    <MyButton tip="comments">
                        <ChatIcon color='primary'/>
                    </MyButton>

                    <span> {commentCount} comments </span>

                </Grid>

                <hr className={classes.visibleSeparator}/>

                <CommentForm postID={postID}/>

                <Comments comments={comments}/>
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