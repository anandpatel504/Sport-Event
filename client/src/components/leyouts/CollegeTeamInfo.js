import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    searchBox: {
        marginTop: 14,
    }
});

// This is for Search engine

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
export default function CollegeTeamInfo() {
    const classes = useStyles();

    const [details, setDetails] = React.useState({ rows: [], CollegeName: "" })
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const handleRows = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                college_name: details.CollegeName,
            })
        };

        const response = await fetch('http://localhost:3003/users/college', requestOptions);
        const resData = await response.json();
        setDetails({
            rows: resData
        })
    }
    if (details.CollegeName !== "" && details.CollegeName !== undefined) {
        handleRows()
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
    return (
        <div className={classes.searchBox}>
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
                        setDetails({ ...details, CollegeName: newValue.college_name })
                    }
                }}
            />

            {/* This is line for table */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>College Name</StyledTableCell>
                            <StyledTableCell align="right">UserName</StyledTableCell>
                            <StyledTableCell align="right">User Role</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.rows.map((row,i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {row.college_name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">{row.user_role}</StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}