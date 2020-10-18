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
import Autocomplete from '@material-ui/lab/Autocomplete';
import SignIn from './SignIn';
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
    marginTop: theme.spacing(3),
  },
  submitStyle: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const topColleges = [
  'Lt. Indira Gandhi Jr.college,nimkheda',
  'C. H. M. College',
  'D. G. Ruparel College of Arts, Scsience and Commerce',
  'H.R. College of Commerce and Economics',
  'Jai Hind College',
  'Hinduja College',
  'Patkar-Varde College',
  'KC College of Engineering'
];

export default function SignUp(props) {
  const [signInFalse, setsignIn] = useState(false)
  const [details, setdetails] = useState({ username: "", mobile: "", birthday: "2000-02-09", college_name: "", email: "", password: "", NameError: false, mobileError: false, birthdayError: false, collegeError: false, emailError: false, passwordError: false })
  const classes = useStyles();
  const validetion = (userInfo) => {
    const { username, mobile, birthday, college_name, email, password } = userInfo;
    if (username === "") {
      setdetails({...details,NameError: true})
      return false
    }
    if (mobile.length !== 10) {
      setdetails({details,mobileError: true})
      return false
    }
    if (birthday.length === 0) {
      setdetails({...details,birthdayError: true})
      return false
    }
    if (college_name === "") {
      setdetails({...details,ollegeError: true})
      return false
    }
    if (!email.includes("@") || !email.includes(".")) {
      setdetails({...details,emailError: true})
      return false
    }
    if (!password.includes("@") || email.length < 5) {
      setdetails({...details,passwordError: true})
      return false
    }
    return true
  }
  const handleSubmit = () => {
    if (validetion(details)) {
      const data = {
        username: details.username,
        email: details.email,
        password: details.password,
        mobile: parseInt(details.mobile),
        college_name: details.college_name,
        DOB: details.birthday
      }
      axios.post('http://localhost:3003/users/sing_up', data).then((res)=>{
                console.log(res.data);
                if (res.data.includes('users_email_unique')) {
                    alert("This is email already taken !")
                }
                else if(res.data.includes("successful")){
                    window.location = "/"
                }
            }).catch(err => console.log(err.message))
    }
  }
  return (
    <div>
      <Dialog
        open={props.SignInProps}
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
              Sign up
        </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="username"
                    error={details.NameError}
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    value={details.username}
                    id="username"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setdetails({
                      ...details, username: e.target.value
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type='number'
                    id="mobilenumber"
                    error={details.mobileError}
                    label="Mobile No."
                    name="mobile"
                    autoComplete="mobile"
                    value={details.mobile}
                    onChange={(e) => setdetails({ ...details, mobile: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    id="date"
                    label="birthday"
                    type="date"
                    name="birthday"
                    error={details.birthdayError}
                    fullWidth
                    autoFocuss
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={details.birthday}
                    onChange={(e) => setdetails({ ...details, birthday: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="CollegeName"
                    name="college_name"
                    options={topColleges}
                    error={details.collegeError}
                    fullWidth
                    autoFocus
                    renderInput={(params) => <TextField {...params} label="College Name" variant="outlined" />}
                    value={details.college_name}
                    onChange={(e, newValue) => { setdetails({ ...details, college_name: newValue }) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={details.emailError}
                    value={details.email}
                    onChange={(e) => setdetails({ ...details, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={details.passwordError}
                    autoComplete="current-password"
                    value={details.password}
                    onChange={(e) => setdetails({ ...details, password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitStyle}
                onClick={handleSubmit}
              >
                Sign Up
          </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" onClick={() => setsignIn(true)} variant="body2">
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
        {signInFalse ? <SignIn seconDialog={signInFalse} dialogProps={props.SignInProps} closeingProps={props.closeingProps}></SignIn> : null}
      </Dialog>
    </div>
  );
}
