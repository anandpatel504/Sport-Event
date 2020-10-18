import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';


export default class Participation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            team_name: '',
            participantion_charge: '200',
            event_name: this.props.handelEventName,
            dialogClose: false,
            teamNameError: "",
            eventNameError: "",
            participantionChargeError: "",
            tokenValidation:['jwt expired','invalid token',"to'ken not found"]
        }
    }
    validetion = () => {
        const { team_name, participantion_charge, event_name } = this.state;
        if (team_name === "") {
            this.setState({
                teamNameError: "Please Enter your Team name !"
            })
            return false
        }
        if (event_name.length === 0) {
            this.setState({
                eventNameError: "Please choose your Event !"
            })
            return false
        }
        if (participantion_charge !== '200') {
            this.setState({
                participantionChargeError: "Please enter a specific amount !"
            })
            return false
        }
        return true
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleClose = () => {
        this.setState({
            dialogClose: true,
        })
    }
    handleSubmit = () => {
        if (this.validetion()) {
            const data = {
            event_name:this.state.event_name,
            participantion_charge:this.state.participantion_charge,
            team_name:this.state.team_name,
            token: localStorage.getItem('UserToken')
            }
            axios.post('http://localhost:3003/participation/create', data).then((res) => {
                if (this.state.tokenValidation.includes(res.data.error)) {
                    alert("Please login again !")
                    localStorage.removeItem("UserToken")
                    window.location="/"
                }
                else if (res.data == 'This event already done!') {
                    alert(res.data)
                    window.location = "/"
                }
                else if (res.data.includes("successfully")) {
                    alert(res.data)
                    window.location = "/"
                }
            }).catch(err => console.log(err.message))

        }
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.dialogProps}
                    onClose={this.props.closeingProps}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Participation
                    </DialogTitle>
                    <DialogContent>
                        <TextField id="standard-team_name" label="Team Name" name="team_name" value={this.state.team_name} onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{this.state.teamNameError}</FormHelperText>

                        <TextField id="standard-eventName" label="Event Name" name="event_name" value={this.state.event_name} onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{this.state.eventNameError}</FormHelperText>

                        <TextField id="standard-participantion_charge" name="participantion_charge" value={this.state.participantion_charge} label="Amount" onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{this.state.participantionChargeError}</FormHelperText>

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus color="primary" value={this.state.dialogClose} onClick={this.props.closeingProps}>
                            Cancel
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
