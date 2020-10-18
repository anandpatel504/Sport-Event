import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios'; 

export default function UserRole(props) {
    const [details, setDetails] = React.useState({ event_name: props.titleProps, description:props.descriptionProps })
    const [error, setError] = React.useState({eventError:"",descriptionError:""})
    const [token, setToken] = React.useState(['jwt expired', 'invalid token', "to'ken not found"])

    const validetion =(UserInfo)=>{
        const {event_name, description}=UserInfo;
        if (event_name === "") {
            setError({...error,eventError: "Required"})
            return false;
        }
        if (description === "") {
            setError({...error,descriptionError: "Required"})
            return false;
        }
        return true;
    }


    const handleSubmit =()=>{
        if (validetion(details)) {
            axios.post('http://localhost:3003/events/update', Object.assign({}, details, {token:localStorage.getItem('UserToken')}))
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
    }



    return (
        <div>
            <Dialog 
            open={props.dialogPropsOpen}
            onClose={props.closeingProps}
            aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editing</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    id="outlined-textarea"
                                    fullWidth
                                    placeholder="Event Name"
                                    variant="outlined"
                                    value={details.event_name}
                                    onChange={(e)=> setDetails({...details,event_name:e.target.value})}

                                />
                                 <FormHelperText id="component-helper-text" style={{ color: "red" }}>{error.eventError}</FormHelperText>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Event DIS"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    variant="outlined"
                                    value={details.description}
                                    onChange={(e)=> setDetails({...details,description:e.target.value})}

                                />
                                 <FormHelperText id="component-helper-text" style={{ color: "red" }}>{error.descriptionError}</FormHelperText>
                            </Grid>
                            <DialogActions>
                                <Button color="primary" onClick={props.closeingProps}>
                                    Cancel

                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    color="primary"
                                    variant="contained"
                                >
                                    Submit
                            </Button>
                            </DialogActions>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const Roles = [
    { title: 'Admin' },
    { title: 'Teacher' },
    { title: 'Student' },
]