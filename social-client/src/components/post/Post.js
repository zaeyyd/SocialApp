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
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'

import ChatIcon from '@material-ui/icons/Chat'
import LikeButton from './LikeButton';



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
    

    render(){

        dayjs.extend(relativeTime)

        const { classes, 
            post: { body, createTime, userIMG, userAT, postID, likeCount, commentCount }, 
            user: { authenticated, credentials: { AT } } } = this.props

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

                    <LikeButton postID={postID}/>

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
  
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Post))
