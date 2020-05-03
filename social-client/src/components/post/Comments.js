import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'



import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from "@material-ui/core/Card"

const styles = theme => ({
    ...theme.spread,
    commentImage: {
        maxWidth: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20,

    },
    cards: {
        padding: '5%',
        width: '100%',
        margin: '2%'
    }
})

class Comments extends Component{
    render(){
        const { comments, classes } = this.props

        return (
            <Card className={classes.cards}>
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createTime, userIMG, userAT } = comment
                    return(
                        <Fragment key={createTime}> 
                            <Grid item sm={12}>
                                <Grid container>
                                    <img src={userIMG} alt="dp" className={classes.commentImage}/>
                                </Grid>

                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography 
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userAT}`}
                                            color="primary">
                                                {userAT}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createTime).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>

                                        <hr className={classes.invisibleSeparator}/>

                                        <Typography variant="body1">{body}</Typography>

                                    </div>
                                </Grid>
                            </Grid>

                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator}/>
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
            </Card>
            )
    }

}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)