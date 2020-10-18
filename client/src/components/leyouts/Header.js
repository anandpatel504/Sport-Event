import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Events from './Events';
import Button from '@material-ui/core/Button';

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: 100,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuClicked: null,
      collegeClicked: false,
      winnerListClicked: false,
      mainClicked: false,
      userRoleClicked: false,
      createEventClicked: false,
      participationClicked: false,
      tokenValidation: ['jwt expired', 'invalid token', "to'ken not found"],
      userRole: ""

    }

  }


  async componentDidMount() {
    const userData = await Axios.post('http://localhost:3003/users/token/validation', { token: localStorage.getItem('UserToken') })
    if (this.state.tokenValidation.includes(userData.data.error)) {
      if (userData.data.error !== "to'ken not found") {
        localStorage.removeItem("UserToken")
        window.location = "/"
      }
      return false;
    } else {
      this.setState({
        userRole: userData.data.user_role
      })
    }
  }

  handleMenu = (event) => {
    this.setState({
      menuClicked: event.currentTarget
    })
  }

  handleClose = ()=>{
    this.setState({
      menuClicked:null,
    })
  }

  handleCollegeList = () => {
    this.setState({
      collegeClicked: true,
      menuClicked: null,
      winnerListClicked: false,
      mainClicked: false,
      createEventClicked: false,
      userRoleClicked: false,
      participationClicked: false,
    })
  }
  handleWinnerList = () => {
    this.setState({
      winnerListClicked: true,
      menuClicked: null,
      collegeClicked: false,
      mainClicked: false,
      createEventClicked: false,
      userRoleClicked: false,
      participationClicked: false,


    })
  }
  handleMainPage = () => {
    this.setState({
      mainClicked: true,
      winnerListClicked: false,
      menuClicked: null,
      collegeClicked: false,
      createEventClicked: false,
      userRoleClicked: false,
      participationClicked: false,


    })
  }

  handleCreagteEvent = () => {
    this.setState({
      createEventClicked: true,
      mainClicked: false,
      winnerListClicked: false,
      menuClicked: null,
      collegeClicked: false,
      userRoleClicked: false,
      participationClicked: false,

    })
  }
  handleUserRole = () => {
    this.setState({
      userRoleClicked: true,
      createEventClicked: false,
      mainClicked: false,
      winnerListClicked: false,
      menuClicked: null,
      collegeClicked: false,
      participationClicked: false,
    })
  }
  handleParticipation = () => {
    this.setState({
      participationClicked: true,
      userRoleClicked: false,
      createEventClicked: false,
      mainClicked: false,
      winnerListClicked: false,
      menuClicked: null,
      collegeClicked: false,
    })
  }

  Logout = () => {
    this.setState({
      participationClicked: false,
      userRoleClicked: false,
      createEventClicked: false,
      mainClicked: false,
      winnerListClicked: false,
      menuClicked: null,
      collegeClicked: false,
    })
    localStorage.removeItem("UserToken")
    window.location = "/"
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon onClick={this.handleMenu} />
              <Menu
                id="simple-menu"
                anchorEl={this.state.menuClicked}
                keepMounted
                open={Boolean(this.state.menuClicked)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleMainPage}>Home</MenuItem>
                <MenuItem onClick={this.handleCollegeList}>College List</MenuItem>
                <MenuItem onClick={this.handleWinnerList}>Winner List</MenuItem>
                {this.state.userRole === "HOD" || this.state.userRole === "Admin" ?
                  <div>
                    <MenuItem onClick={this.handleCreagteEvent} >Create Event</MenuItem>
                  </div>
                  : null}

                {this.state.userRole === "HOD" ?
                  <div>
                    <MenuItem onClick={this.handleUserRole} >User Role</MenuItem>
                  </div>
                  : null}

                {this.state.userRole !== "" ?
                  <div>
                    <MenuItem onClick={this.handleParticipation}>Participations</MenuItem>
                    <MenuItem onClick={this.Logout}>
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary">
                        Log Out
                    </Button>
                    </MenuItem>
                  </div>
                  : null}

              </Menu>
            </IconButton>

            <Typography className={classes.title} variant="h6" noWrap>
              Lala Lajpat Rai College Fest Management
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        {this.state.collegeClicked ? <Redirect to="/collegelist"></Redirect> : null}
        {this.state.winnerListClicked ? <Redirect to="/winners/list"></Redirect> : null}
        {this.state.mainClicked ? <Redirect to="/events"></Redirect> : null}
        {this.state.createEventClicked ? <Redirect to="/event/create"></Redirect> : null}
        {this.state.userRoleClicked ? <Redirect to="/define/role"></Redirect> : null}
        {this.state.participationClicked ? <Redirect to="/participations"></Redirect> : null}
      </div>
    )
  }
}
export default withStyles(styles)(Header);