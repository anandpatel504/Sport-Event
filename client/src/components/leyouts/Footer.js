import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '16vh',
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  });

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
              <footer className={classes.footer}>
                <Container maxWidth="sm">
                  <Typography variant="body1">Welcome to school events 🙂 </Typography>
                  <Copyright />
                </Container>
              </footer>
            </div>
          );
    }
}
export default withStyles(useStyles)(Footer);