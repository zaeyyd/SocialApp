import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/icon.png";
import Pointing from "../images/pointing.png";
import Monkey from "../images/surprisedMonkey.png";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { signInUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.spread,
  emoji: {
    height: "2em",
  },
});

class signIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signInUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            <img src={AppIcon} alt="logo" className={classes.image} />
            Sign In
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="EMAIL"
              variant="outlined"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="PASSWORD"
              variant="outlined"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            />

            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              <h2>
                <img src={Pointing} className={classes.emoji} />
              </h2>

              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />
            <small>
              <Link to="/signup">
                don't have an account??{" "}
                <img src={Monkey} className={classes.emoji} />
              </Link>
            </small>
          </form>
        </Grid>

        <Grid item sm />
      </Grid>
    );
  }
}

signIn.propTypes = {
  classes: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signInUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signIn));
