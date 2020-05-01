import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { DialogTitle, DialogContent, TextField, Button, Dialog } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import MyButton from '../../util/MyButton'

import { connect } from 'react-redux'
import { makePost, clearErrors } from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spread,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        marginBottom: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})

class MakePost extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){   // replace this function cuz its old
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, error: {} })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, error: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.makePost({ body: this.state.body })
    }
    render(){
        const { errors } = this.state
        const { classes, UI: { loading }} = this.props
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Say Something">
                    <AddIcon />
                </MyButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>
                        New Post
                    </DialogTitle>

                    <DialogContent>
                         <form onSubmit={this.handleSubmit}>
                             <TextField
                                name="body"
                                type="text"
                                label="Say Something"
                                multiline
                                rows="3"
                                placeholder="keep it PG please"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />

                                <Button type="submit" variant="contained" color="primary"
                                    className={classes.submitButton} disabled={loading} >
                                            Share
                                        {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                                        

                                </Button>
                         </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

MakePost.propTypes = {
    makePost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
}) 

export default connect(mapStateToProps, { makePost, clearErrors })(withStyles(styles)(MakePost))
