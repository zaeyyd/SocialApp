import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Card from "@material-ui/core/Card"

import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spread,
    cards: {
        padding: '5%',
        width: '100%',
        margin: '2%'
    }

})
class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: ''})
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.postID, { body: this.state.body })
    }
    render() {

        const { classes, authenticated } = this.props
        const errors  = this.state.errors

        const commentFormMarkup = authenticated ? (
            <Card className={classes.cards}>
            <Grid item sm={12} style={{textAlign: 'center'}} >
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name='body'
                        type='text'
                        label='comment'
                        variant="outlined"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}/>
                    <Button 
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                            Send
                        </Button>

                </form>
                


            </Grid>
            </Card>
            ) : null

        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
