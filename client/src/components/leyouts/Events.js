import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography, Grid, Fab } from '@material-ui/core';
import Sponsores from './sponsores';
import Participation from './Participation';
import EditEvent from './EditEvent';
import SignIn from '../SignIn';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import { token } from 'morgan';

const useStyles = (theme) => ({
  root: {
    maxWidth: 475,
    padding: 5,
    margin: 'auto',
    marginTop: 16,
  },
  title: {
    letterSpacing: 2,
    textTransform: 'capitalize',
  },
  sponButton: {
    fontSize: 15,
    fontStyle: 'oblique',
  }

});
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventData: [],
      dialogCheck: false,
      propsEventName: "",
      propsDiscrition: "",
      JoinDialogCheck: false,
      singDialogBox: false,
      editButton: false,
      tokenValidation: ['jwt expired', 'invalid token', "to'ken not found"],
      UserRole: "",

    };
  }


  async componentDidMount() {
    await axios.get('http://localhost:3003/events/categories').then((res) => {
      this.setState({
        EventData: res.data
      })
    }).catch((error) => console.log(error.message));

    const userData = await axios.post('http://localhost:3003/users/token/validation', { token: localStorage.getItem('UserToken') })
    if (this.state.tokenValidation.includes(userData.data.error)) {
      if (userData.data.error !== "to'ken not found") {
        localStorage.removeItem("UserToken")
        window.location = "/"
      }
      return false;
    } else {
      this.setState({
        UserRole: userData.data.user_role
      })
    }
  }
  handelEventRemove =(event)=>{
    axios.post('http://localhost:3003/events/delete', Object.assign({}, {event_name:event}, {token:localStorage.getItem('UserToken')}))
    .then((Response) => {
        if (Object.keys(Response.data).includes("error")) {
            if (token.includes(Response.data.error)) {
                alert("Please login again !")
                localStorage.removeItem("UserToken")
                window.location = "/"
            } else {
                alert(Response.data.error)
            }
        } else {
            alert(Response.data);
            window.location = "/events"
        }
    }).catch((err) => {
        console.log(err);
    })
  }
  dialogOpen = (Ename, join) => {
    if (join) {
      this.setState({
        propsEventName: Ename
      })
    } else {
      this.setState({
        dialogCheck: true,
        propsEventName: Ename
      })
    }
  }
  joinDialogOpen = () => {
    const token = localStorage.getItem('UserToken')
    if (token) {
      this.setState({
        JoinDialogCheck: true
      })
    } else {
      this.setState({
        singDialogBox: true,
      })
    }
  }
  closeingDialog = () => {
    this.setState({
      dialogCheck: false,
      JoinDialogCheck: false,
      singDialogBox: false,
      editButton: false,
    })
  }
  handelEdit = (title, des) => {
    this.setState({
      propsEventName: title,
      propsDiscrition: des,
      editButton: true,
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.EventData.map(el =>
          <div>
            <Card className={classes.root}>
            <AppBar position="static">
            <Grid container spacing={3}>
            {this.state.UserRole === "HOD" || this.state.UserRole === "Adimn" ?
                    <Grid item item xs={6} sm={0} >
                      <label htmlFor="contained-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => { this.handelEdit(el.event_name, el.description) }} >
                          <EditIcon style={{color:"#ffc107"}}/>
                        </IconButton>
                      </label>
                    </Grid>

                    : null}
                    
                  {this.state.UserRole === "HOD" || this.state.UserRole === "Adimn" ?
                    <Grid item item xs={6} sm={0}>
                      <label htmlFor="contained-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => { this.handelEventRemove(el.event_name) }} >
                          <DeleteIcon style={{color:"red"}}/>
                        </IconButton>
                      </label>
                    </Grid>


                    : null}
            </Grid>
            </AppBar>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="160"
                  image="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  title="Events"
                />
                <CardContent>
                  <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                    {el.event_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {el.description}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    <b className={classes.sponButton}>sponsored by</b>- <span style={{ color: 'green' }}>{el.sponsors}</span>
                  </Typography>

                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container spacing={3}>
                  <Grid item item xs={6} sm={0} >
                    <Button variant="contained" size="small" color="primary" onClick={() => { this.joinDialogOpen(); this.dialogOpen(el.event_name, true) }}>
                      join
              </Button>

                  </Grid>
                  <Grid item item xs={6} sm={0}>
                    <Button variant="contained" size="small" color="secondary" onClick={() => { this.dialogOpen(el.event_name) }}>
                      sponsore
              </Button>
                  </Grid>

                 

                </Grid>

              </CardActions>
            </Card>
            {this.state.dialogCheck ? <Sponsores dialogProps={this.state.dialogCheck} handelEventName={this.state.propsEventName} closeingProps={this.closeingDialog} /> : null}
            {this.state.JoinDialogCheck ? <Participation dialogProps={this.state.JoinDialogCheck} handelEventName={this.state.propsEventName} closeingProps={this.closeingDialog} /> : null}
            {this.state.singDialogBox ? <SignIn dialogProps={this.state.singDialogBox} closeingProps={this.closeingDialog} /> : null}

            {this.state.editButton ? <EditEvent titleProps={this.state.propsEventName} descriptionProps={this.state.propsDiscrition} closeingProps={this.closeingDialog} dialogPropsOpen={this.state.editButton} /> : null}
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(useStyles)(Events); 