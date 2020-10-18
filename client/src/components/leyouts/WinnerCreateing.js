import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
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
        width: '70%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        margin: "auto"
    },
    wid: {
        width: '100%'
    },
    scores: {
        width: "50%"
    },
    submit: {
        margin: theme.spacing(4, 0, 3),
        width: '30%'
    },
}));

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function WinnerCreateing() {
    const classes = useStyles();
    const [details, setDetails] = React.useState({ college_name: "", event_name: "", winner_team: "", team_captain: "", total_scores: "" })
    const [RedError, setRedError] = React.useState({ eventError: Boolean(false), winnerError: Boolean(false), captainError: Boolean(false), scoresError: Boolean(false), collegeError: Boolean(false) })
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setMsgError] = React.useState({ collegeNameError: "", EventNameError: "", winnerTeamError: "", teamCaptainError: "", totalScoresError: "" })
    const [token, setToken] = React.useState(['jwt expired', 'invalid token', "to'ken not found"])
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;


    const validetion = (Info) => {
        const { college_name, event_name, winner_team, description, team_captain, total_scores } = Info;
        if (college_name.length === 0) {
            setMsgError({ ...errorMsg, collegeNameError: "please fill the college box!" })
            return false
        }
        if (event_name.length === 0) {
            setMsgError({ ...errorMsg, EventNameError: "please fill the event box!", collegeNameError:"" })
            return false
        }
        if (winner_team.length === 0) {
            setMsgError({ ...errorMsg, winnerTeamError: "please fill the winner box!",EventNameError:" " })
            return false
        }
        if (team_captain.length === 0) {
            setMsgError({ ...errorMsg, teamCaptainError: "please fill the team captain box!",winnerTeamError:"",EventNameError:"" })
            return false
        }
        if (total_scores.length === 0) {
            setMsgError({ ...errorMsg, totalScoresError: "please fill the scores box!",teamCaptainError:"",winnerTeamError:"" })
            return false
        }
        setMsgError({ ...errorMsg,totalScoresError:"",teamCaptainError:"" })
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

    const handleWinnerTeam = (e) => {
        if (e.target.value.length == 0) {
            setRedError({ ...RedError, winnerError: Boolean(true) })
        } else {
            setRedError({ ...RedError, winnerError: Boolean(false) })
        }
        setDetails({ ...details, winner_team: e.target.value })
    }

    const handleCaptain = (e) => {
        if (e.target.value.length == 0) {
            setRedError({ ...RedError, captainError: Boolean(true) })
        } else {
            setRedError({ ...RedError, captainError: Boolean(false) })
        }
        setDetails({ ...details, team_captain: e.target.value })
    }

    const handleScores = (e) => {
        if (e.target.value.length == 0) {
            setRedError({ ...RedError, scoresError: Boolean(true) })
        } else {
            setRedError({ ...RedError, scoresError: Boolean(false) })
        }
        setDetails({ ...details, total_scores: e.target.value })
    }


    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://localhost:3003/users/colleges/list');
            await sleep(1e3); // For demo purposes.
            const collegeList = await response.json();
            if (active) {
                setOptions(collegeList);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleSubmit = () => {
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
                    image="https://getfarming.com.au/wp-content/uploads/2017/05/award-trophy-gold.jpg"
                    title="Winners"
                />

            </CardActionArea>

            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            id="asynchronous-demo"
                            style={{ width: 300, margin: 'auto', marginBottom: 16 }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            getOptionSelected={(option, value) => option.college_name === value.college_name}
                            getOptionLabel={(option) => option.college_name}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="college name"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                            onChange={(e, newValue) => {
                                if (newValue !== null) {
                                    setDetails({ ...details, college_name: newValue.college_name })
                                }
                            }}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{errorMsg.collegeNameError}</FormHelperText>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="event_name"
                            label="Event Name"
                            name="eventName"
                            autoComplete="ename"
                            error={Boolean(RedError.eventError)}
                            value={details.event_name}
                            onChange={handleEvent}
                            onFocus={handleEvent}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{errorMsg.EventNameError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="winner_team"
                            name="winner_team"
                            variant="outlined"
                            required
                            fullWidth
                            id="winner_team"
                            label="Winner Team Name"
                            error={Boolean(RedError.winnerError)}
                            value={details.winner_team}
                            onChange={handleWinnerTeam}
                            onFocus={handleWinnerTeam}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{errorMsg.winnerTeamError}</FormHelperText>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="team_captain"
                            label="Team Captain"
                            name="team_captain"
                            autoComplete="team_captains"
                            error={Boolean(RedError.captainError)}
                            value={details.team_captain}
                            onChange={handleCaptain}
                            onFocus={handleCaptain}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red" }}>{errorMsg.teamCaptainError}</FormHelperText>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            className={classes.scores}
                            type='number'
                            id="scores"
                            label="Scores"
                            name="scores"
                            autoComplete="scores"
                            error={Boolean(RedError.scoresError)}
                            value={details.total_scores}
                            onChange={handleScores}
                            onFocus={handleScores}
                        />
                        <FormHelperText id="component-helper-text" style={{ color: "red",marginLeft:"25%" }}>{errorMsg.totalScoresError}</FormHelperText>

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
                    submit
          </Button>
            </form>
        </Card>
    )
}