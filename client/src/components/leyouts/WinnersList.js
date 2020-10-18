import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function WinnersList() {
    const classes = useStyles();

    const [details, setDetails] = React.useState({ rows: [] })

    const handleRows = async()=>{
        const response = await fetch('http://localhost:3003/events/winners');
        const resData = await response.json();
        if (resData.length === 0) {
            alert("No winners, Please wait some time... !")
            window.location = "/"
        }else{
            setDetails({...details,rows: resData})
        }
    }

    if (details.rows.length == 0){
        handleRows()
    }

    return (
        <div className={classes.searchBox}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>College Name</StyledTableCell>
                            <StyledTableCell align="right">Event Name</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Event Creator</StyledTableCell>
                            <StyledTableCell align="right">Creator Role</StyledTableCell>
                            <StyledTableCell align="right">Winner Team</StyledTableCell>
                            <StyledTableCell align="right">Team Captain</StyledTableCell>
                            <StyledTableCell align="right">Total Scores</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.rows.map((row,i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {row.college_name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.event_name}</StyledTableCell>
                                <StyledTableCell align="right">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.event_creator}</StyledTableCell>
                                <StyledTableCell align="right">{row.creator_role}</StyledTableCell>
                                <StyledTableCell align="right">{row.winner_team}</StyledTableCell>
                                <StyledTableCell align="right">{row.team_captain}</StyledTableCell>
                                <StyledTableCell align="right">{row.total_scores}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}