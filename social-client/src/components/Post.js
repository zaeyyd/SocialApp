import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core';
//import { Link } from '@material-ui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


let Link = require("react-router-dom").Link


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150,
        borderRadius: 10,
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

        const { classes, post: { body, createTime, userIMG, userAT, postID, likeCount, commentCount } } = this.props // <--- stuff from 
    
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

                    <Typography variant='body2' color="textSecondary">{dayjs(createTime).fromNow()}</Typography>

                    <Typography variant='body1'>{body}</Typography>

                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post)
