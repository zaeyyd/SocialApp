import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.png'
import Pointing from '../images/pointing.png'
import Monkey from '../images/surprisedMonkey.png'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core'

import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { signUpUser } from '../redux/actions/userActions'
import { Link } from 'react-router-dom'


const styles = (theme) => ({
    
    ...theme.spread,
    emoji: {
        height: '2em'
    }

})



class signUp extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            pwConfirm: '',
            AT: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors})
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })

        const newUserData  = {
            email: this.state.email,
            password: this.state.password,
            pwConfirm: this.state.password,
            AT: this.state.AT
        }
        this.props.signUpUser(newUserData, this.props.history)

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        const { classes, UI: { loading } } = this.props
        const { errors } = this.state

        return (
            <Grid container className={classes.form}>

                <Grid item sm/>

                <Grid item sm>
                    
                    <Typography variant='h2' className={classes.pageTitle}>
                    <img src={AppIcon} alt='logo' className={classes.image} />
                    Sign Up
                    </Typography>
                    
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField id='email' name='email' type='email' label='EMAIL' className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth  helperText={errors.email} 
                            error={errors.email ? true : false} />

                        <TextField id='password' name='password' type='password' label='PASSWORD' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} 
                            error={errors.password ? true : false}/>

                        <TextField id='pwConfirm' name='pwConfirm' type='password' label='CONFIRM PASSWORD' className={classes.textField}
                            value={this.state.pwConfirm} onChange={this.handleChange} fullWidth helperText={errors.pwConfirm} 
                            error={errors.pwConfirm ? true : false}/>

                        <TextField id='AT' name='AT' type='text' label='@' className={classes.textField}
                            value={this.state.AT} onChange={this.handleChange} fullWidth helperText={errors.AT} 
                            error={errors.AT ? true : false}/>

                        {errors.error && (<Typography variant="body2" className={classes.customError}>
                            {errors.error}
                            </Typography> 
                        )}

                        <Button type="submit" variant='contained' color='primary' className={classes.button} disabled={loading}>
                            <h2>
                            <img src={Pointing} className={classes.emoji}/>
                            </h2>

                            {loading && <CircularProgress className={classes.progress}/>}
                        </Button>
                        <br/>
                        <small><Link to="/signin">already have an account?</Link></small>
                  


                    </form>
                </Grid>


                <Grid item sm/>

            </Grid>
        )
    }
}

signUp.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(signUp))
