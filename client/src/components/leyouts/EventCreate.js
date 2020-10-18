import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 845,
        margin: "auto"
    },
    media: {
        height: 240,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    wid: {
        width: '50%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EventCreate() {
    const classes = useStyles();
    const [details, setDetails] = React.useState({ event_name: "", description: "", descriptionNameError: "", EventNameError: "" })
    const [RedError, setRedError] = React.useState({ eventError: Boolean(false), descriptionError: Boolean(false) })
    const [token, setToken] = React.useState(['jwt expired', 'invalid token', "to'ken not found"])
    const validetion = (userInfo) => {
        const { event_name, description } = userInfo;
        if (details.event_name.length <= 3) {
            setDetails({ ...details, EventNameError: "Event name is too short(min. is 4 characters.)!", descriptionNameError: "Description is too short!" })
            return false
        }
        if (details.description.length <= 10) {
            setDetails({ ...details, descriptionNameError: "Description is too short!", EventNameError: "" })
            return false
        }
        setDetails({ ...details, descriptionNameError: "", })
        return true
    }
    const handleEvent = (e) => {
        if (e.target.value.length == 0) {
            setRedError({ ...RedError, eventError: Boolean(true) })
        } else {
            setRedError({ ...RedError, eventError: Boolean(false) })
        }
        setDetails({ ...details, event_name: e.target.value })
    }
    const handleDescription = (e) => {
        if (e.target.value.length == 0) {
            setRedError({ ...RedError, descriptionError: Boolean(true) })
        } else {
            setRedError({ ...RedError, descriptionError: Boolean(false) })
        }
        setDetails({ ...details, description: e.target.value })
    }
    const handleSubmit = () => {
        if (validetion(details)) {
            const user_Info = {
                event_name: details.event_name,
                description: details.description,
                token: localStorage.getItem('UserToken')
            }
            
            axios.post('http://localhost:3003/events/add', user_Info)
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
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhire4event.com%2Fadmin%2Fimage%2F14Feb2017110241home.balls_.new_.jpg&f=1&nofb=1"
                    title="Events"
                />

            </CardActionArea>

            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} style={{ margin: "auto" }}>
                        <TextField
                            autoComplete="ename"
                            name="eventName"
                            variant="outlined"
                            required
                            fullWidth
                            id="eventName"
                            label="Event Name"
                            error={Boolean(RedError.eventError)}
                            value={details.event_name}
                            onChange={handleEvent}
                            onFocus={handleEvent}

                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{details.EventNameError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.wid}
                            id="event-description"
                            label="Event Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            error={Boolean(RedError.descriptionError)}
                            value={details.description}
                            onChange={handleDescription}
                            onFocus={handleDescription}

                        />
                        <Grid item xs={12} sm={5} style={{ margin: "auto" }}>
                            <FormHelperText id="component-helper-text" style={{ color: "red" }}>{details.descriptionNameError}</FormHelperText>
                        </Grid>
                    </Grid>
                </Grid>
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Submit
             </Button>
            </form>
        </Card>
    )
}