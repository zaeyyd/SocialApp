import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
import { DialogTitle, DialogContent, TextField, DialogActions, Button, Dialog } from '@material-ui/core'


import EditIcon from '@material-ui/icons/Edit'
import MyButton from '../../util/MyButton'

const styles = (theme) => ({
    ...theme.spread,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state ={
        bio: '',
        website: '',
        location: '',
        open: false
    }

    mapUserDetailsToState = (credentials) =>{
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }
    
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentDidMount(){

        const { credentials } = this.props
        this.mapUserDetailsToState(credentials)
        
    }

    render() {
            const { classes } = this.props
        return (
            <Fragment>

                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>

                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>

                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField 
                                    name="bio"
                                    type='text'
                                    label="Bio"
                                    multiline
                                    rows='3'
                                    variant="outlined"
                                    placeholder="Some words about yourself"
                                    className={classes.textField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />


                                <TextField 
                                    name="website"
                                    type='text'
                                    label="Website"
                                    variant="outlined"
                                    placeholder="Your website"
                                    className={classes.textField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />

                                <TextField 
                                    name="location"
                                    type='text'
                                    label="Location"
                                    variant="outlined"
                                    placeholder="Where you live"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails} )(withStyles(styles)(EditDetails))
