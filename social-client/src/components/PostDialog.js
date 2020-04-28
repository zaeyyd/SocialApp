import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom'

//MUI 
import { DialogTitle, DialogContent, TextField, Button, Dialog } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//ICONS
import CloseIcon from '@material-ui/icons/Close'
//Redux

import { connect } from 'react-redux'
import { getPost } from '../redux/actions/dataActions'

const styles = {

}

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
    }

    return (
        
    )
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