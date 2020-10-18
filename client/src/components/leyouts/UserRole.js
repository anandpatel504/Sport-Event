import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from '@material-ui/core/FormHelperText';  
import axios from 'axios';


export default function UserRole() {
     const [details, setDetails] = React.useState({ email: "", user_role:"" })
    const [error, setError] = React.useState({emailError:"",roleError:""})
    const [token, setToken] = React.useState(['jwt expired', 'invalid token', "to'ken not found"])
    const defaultProps = {
        options: Roles,
        getOptionLabel: (option) => option.title,
    };

    const handleCancel = () =>{
        window.location="/"
    }
    const validetion = (userInfo) => {
        console.log(userInfo);
        const { email, user_role } = userInfo;
        if (email === "") {
            setError({ ...error, emailError: "Required", roleError: "" })
            return false
        }
        if (user_role ==="") {
            setError({ ...error, roleError: "Required", emailError: "" })
            return false
        }
        setError({ ...error, roleError: "", })
        return true
    }

    const handleSubmit =()=>{
        if (validetion(details)) {
            axios.post('http://localhost:3003/users/user_role', Object.assign({}, details, {token:localStorage.getItem('UserToken')}))
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
            <Dialog open aria-labelledby="form-dialog-title">
                <form
                    onSubmit={e => {
                        alert("form submit!");
                        e.preventDefault();
                    }}
                >
                    <DialogTitle id="form-dialog-title">User Role</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="email"
                            type="email"
                            fullWidth
                            onChange={(e)=> setDetails({...details,email:e.target.value})}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{error.emailError}</FormHelperText>
                        <Autocomplete
                            {...defaultProps}
                            id="role"
                            renderInput={(params) => <TextField {...params} label="Role" margin="normal" />}
                            onChange={(e,newValue) =>{
                                if(newValue !== null){
                                    setDetails({ ...details, user_role:newValue.title })
                                }
                            }}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{error.roleError}</FormHelperText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancel
            </Button>
                        <Button
                            // type="submit"
                            onClick={handleSubmit}
                            color="primary"
                            variant="contained"
                        >
                            Submit
            </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

const Roles = [
    { title: 'Admin' },
    { title: 'Teacher' },
    { title: 'Student'},
]