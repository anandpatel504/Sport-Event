import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';


export default class Sponsores extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            sponsor_name:'',
            email:'',
            mobile:0,
            company_name:'',
            sponsoring_amount:'10,000',
            event_name:this.props.handelEventName,
            dialogClose:false,
            sponsor_nameError:"",
            emailError:"",
            mobileError:"",
            company_nameEroor:"",
            sponsoring_amountError:"",
            eventNameEroor:"",



        }
    }
    validetion=()=>{
        const {sponsor_name, email, mobile, company_name, sponsoring_amount, event_name} = this.state;
        if (sponsor_name.length <5) {
            this.setState({
                sponsor_nameError:"Your name must be 5 chars long",
            })
            return false
        }
        if(!email.includes("@")||!email.includes(".")){
            this.setState({
                emailError:"Please enter valid email !"
            })
            return false
        }
        if(mobile.length !== 10){
            this.setState({
                mobileError:"Please enter valid Mobile number !",
            })
            return false
        }
        if(company_name === ""){
            this.setState({
                company_nameEroor:"Please Enter your Company name !"
            })
            return false
        }
        if(event_name.length === 0){
            this.setState({
                eventNameEroor:"Please choose your Event !"
            })
            return false
        }
        if (sponsoring_amount !== '10,000') {
            this.setState({
                sponsoring_amountError:"Please enter a specific amount !"
            })
            return false
        }
        return true
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    handleClose =()=>{
        this.setState({
            dialogClose:true,
        })
    }
    handleSubmit=()=>{
        if (this.validetion()) {
            const data= {
                sponsor_name:this.state.sponsor_name,
                email:this.state.email,
                mobile:parseInt(this.state.mobile),
                company_name:this.state.company_name,
                sponsoring_amount:this.state.sponsoring_amount,
                event:this.state.event_name
            }
            axios.post('http://localhost:3003/sponsores/create', data).then((res)=>{
                console.log(res.data);
                if (res.data == 'You already sponsored!') {
                    alert(res.data)
                    window.location = "/"
                }
                else if(res.data.includes("successful")){
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
                        Sponsores
                    </DialogTitle>
                    <DialogContent>
                        <TextField id="standard-name" label="Name" name="sponsor_name" value={this.state.sponsor_name} onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.sponsor_nameError}</FormHelperText>

                        <TextField id="standard-eventName" label="Event Name" name="event_name" value={this.state.event_name} onChange={this.handleChange}/>
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.eventNameEroor}</FormHelperText>

                        <TextField id="standard-email" label="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.emailError}</FormHelperText>

                        <TextField id="standard-mobile" name="mobile" value={this.state.mobile} type="number" label="mobile" onChange={this.handleChange}/>
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.mobileError}</FormHelperText>

                        <TextField id="standard-company_name" label="company_name" name="company_name" value={this.state.company_name} onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.company_nameEroor}</FormHelperText>

                        <TextField id="standard-sponsoring_amount" name="sponsoring_amount" value={this.state.sponsoring_amount} label="Amount" onChange={this.handleChange} />
                        <FormHelperText id="component-helper-text" style={{color:"red"}}>{this.state.sponsoring_amountError}</FormHelperText>

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
