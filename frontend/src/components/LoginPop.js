import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { authSignup } from '../store/actions/auth';
import logo from '../img/logo.png';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="https://material-ui.com/">
        Jake Sewai
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  icons: {
    position: 'absolute',
    right: 0,
    zIndex: 99,
    bottom: 0,
  },
  logo: {
    width: '7rem',
  },
});


const LoginPop = () => {
  const classes = useStyles();
  const {register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { errorDetail } = useSelector(state => ({
    errorDetail: state.auth.errorDetail
  }));
 
  const [open, setOpen] = useState(false);
  const onSubmit = (data) => {
    dispatch(authSignup(data))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Checkbox variant="outlined" color="primary" className={classes.icons} onClick={handleClickOpen} icon={<FavoriteBorder />} checkedIcon={<FavoriteBorder />}>
      </Checkbox>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <Button onClick={handleClose}>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Button>
          <DialogContentText>
            Found an interesting posting? Sign in to save it for later!
          </DialogContentText>
            <form className={classes.form} noValidate onSubmit={handleSubmit(function (data){onSubmit(data)})}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register}
              color="secondary"
            />
            {errorDetail && <Alert severity="error">{errorDetail}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              inputRef={register}
              color="secondary"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: "PASSWORD REQUIRED", minLength: 5})}
              color="secondary"
            />
            {errors.password && <Alert severity="error">Password must be at least 5 characters</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default LoginPop
