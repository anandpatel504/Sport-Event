import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import SignUp from './SignUp';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn(props) {
  const [signupFalse, setsignup] = useState(false)
  const [details, setDetails] = useState({ email: "", password: "", emailError: false, passwordError: false })
  const classes = useStyles();

  const validetion = (userInfo) => {
    const { email, password } = userInfo;
    if (!email.includes("@") || !email.includes(".")) {
      setDetails({...details,emailError: true})
      return false
    }
    if (!password.includes("@") || email.length < 5) {
      setDetails({...details,passwordError: true})
      return false
    }
    return true
  }

  const handleSignIn = () => {
    if (validetion(details)) {
      const user_Info = {
        email: details.email,
        password: details.password
      }
      axios.post('http://localhost:3003/users/login', user_Info)
        .then((Response) => {
          if(Response.data.includes("This @Email does not exist!")){
            alert(Response.data)
          }else if(Response.data.includes("password is worng!")){
            alert(Response.data)
          }
           else {
            let newToken = Response.data
            console.log(newToken);
            localStorage.setItem('UserToken', newToken)
            window.location="/"
          }
        })
    }
  }


  return (
    <div>
      <Dialog
        open={props.dialogProps}
        onClose={props.closeingProps}
        aria-labelledby="draggable-dialog-title"
      >
        <IconButton onClick={props.closeingProps} color="primary" aria-label="upload picture" component="span">
          <HighlightOffIcon />

        </IconButton>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                error={details.emailError}
                value={details.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={details.passwordError}
                value={details.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setDetails({ ...details, password: e.target.value })}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignIn}
              >
                Sign In
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
              </Link>
                </Grid>
                <Grid item>
                  <Link href="#" onClick={() => setsignup(true)} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        {signupFalse ? <SignUp seconDialog={signupFalse} SignInProps={props.dialogProps} closeingProps={props.closeingProps}></SignUp> : null}
      </Dialog>
    </div>
  );
}
