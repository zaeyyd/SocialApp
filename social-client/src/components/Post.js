import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataActions'
import MyButton from '../util/MyButton';
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'

import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150,
        borderRadius: 5,
        margin: 10
        
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postID === this.props.post.postID))
            return true
            else return false
    }

    likePost = () => {
        this.props.likePost(this.props.post.postID)
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID)
    }

    render(){

        dayjs.extend(relativeTime)

        const { classes, 
                post: { body, createTime, userIMG, userAT, postID, likeCount, commentCount }, 
                user: { authenticated, credentials: { AT } } } = this.props // <--- stuff from 

        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/signin'>
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedPost() ? (
                <MyButton tip='Unlike' onClick={this.unlikePost}>
                    <FavoriteIcon color='primary'/>
                </MyButton>
            ) : (
                <MyButton tip='Like' onClick={this.likePost}>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            )
        )

        const deleteButton = authenticated && userAT === AT ? (
            <DeletePost postID={postID}/>
        ) : null
        return (
            <Card className={classes.card}>

                <CardMedia image={userIMG} title="DP" className={classes.image}/>

                <CardContent className={classes.content}>

                    <Typography 
                    variant='h5'
                    component={Link} 
                    to={`/users/${userAT}`}
                    color='primary'> 

                        {userAT} 
                        
                    </Typography>

                    {deleteButton}

                    <Typography variant='body2' color="textSecondary">{dayjs(createTime).fromNow()}</Typography>

                    <Typography variant='body1'>{body}</Typography>

                    {likeButton}

                    <span> {likeCount} likes </span>

                    <MyButton tip="comments">
                        <ChatIcon color='primary'/>
                    </MyButton>

                    <span> {commentCount} comments </span>

                    <PostDialog postID={postID} userAT={userAT}/>

                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = { 
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))
