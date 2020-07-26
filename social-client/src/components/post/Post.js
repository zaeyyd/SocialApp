import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'

import LikeButton from './LikeButton';



const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: "15%",
        borderRadius: "50rem",
        margin: 10,
        float: 'left'
        
    },
    content: {
        padding: 15,
        objectFit: 'cover',
        width: "100%"
    },
    header: {
        padding: "0rem"

    },
    delete: {
        
    }
}

class Post extends Component {
    

    render(){

        dayjs.extend(relativeTime)

        const { classes, 
            post: { body, createTime, userIMG, userAT, postID, likeCount, commentCount }, 
            user: { authenticated, credentials: { AT } } } = this.props

        const deleteButton = authenticated && userAT === AT ? (
            <DeletePost postID={postID}  />
        ) : null
        return (
            <Card className={classes.card}>

                

                <CardContent className={classes.content}>
                
                <CardHeader className={classes.header}
                    avatar={
                <Avatar src={userIMG} title="DP" className={classes.image}/>
                    }

                    title={
                    <Typography 
                    variant='h5'
                    component={Link} 
                    to={`/users/${userAT}`}
                    color='primary'> 

                        {userAT} 
                        
                    </Typography>
                    }
                    
                    action={deleteButton}
                    />
                    
                    
                    
                    
                    
                    <Typography variant='body2' color="textSecondary">{dayjs(createTime).fromNow()}</Typography>

                    <Typography variant='body1'>{body}</Typography>

                    <LikeButton postID={postID}/>

                    <span> {likeCount} likes </span>

                    <PostDialog postID={postID} userAT={userAT} openDialog={this.props.openDialog}/>

                    <span> {commentCount} comments </span>

                    

                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
  
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Post))
