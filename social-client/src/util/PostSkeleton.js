import React, { Fragment } from 'react'
import defaultImg from '../images/no-img.png'
import PropTypes from 'prop-types'
//MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    ...theme.spread,
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
        marginBottom: 7,
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
        width: '90%',
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

const PostSkeleton = (props) => {
    const { classes } = props

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={defaultImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.AT}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>

            </CardContent>
        </Card>
    ))

    return <Fragment> {content} </Fragment>

}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSkeleton)