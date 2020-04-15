import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
let Link = require("react-router-dom").Link


const styles = (theme) => ({
    
    ...theme.spread

})



class signIn extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            loading: false, //<--- important
            errors: {}
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })

        const userData  = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/signin', userData)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({
                loading: false
            })

            this.props.history.push('/')  // goes back to homepage
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        const { classes } = this.props
        const { errors, loading } = this.state

        return (
            <Grid container className={classes.form}>

                <Grid item sm/>


                <Grid item sm>
                    
                    <Typography variant='h2' className={classes.pageTitle}>
                    <img src={AppIcon} alt='logo' className={classes.image} />
                    Sign In
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField id='email' name='email' type='email' label='EMAIL' className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth  helperText={errors.email} 
                            error={errors.email ? true : false} />

                        <TextField id='password' name='password' type='password' label='PASSWORD' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} 
                            error={errors.password ? true : false}/>

                        {errors.error && (<Typography variant="body2" className={classes.customError}>
                            {errors.error}
                            </Typography> 
                        )}

                        <Button type="submit" variant='contained' color='primary' className={classes.button} disabled={loading}>
                            <h2>
                            👉
                            </h2>

                            {loading && <CircularProgress className={classes.progress}/>}
                        </Button>
                        <br/>
                        <small><Link to="/signup">don't have an account?? 😮</Link></small>
                  


                    </form>
                </Grid>


                <Grid item sm/>

            </Grid>
        )
    }
}

signIn.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signIn)
