// import React, {Component} from 'react'
import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

//VIN number for 1981 to present is standardized for 17 digits
//0-9 and capital letters allowed
const VINCheckData = ({value}) => {
    let countStatus = value.Count;
    let messageStatus = value.Message;
    let searchCriteriaStatus = value.SearchCriteria;
    let resultStatus = value.Results;
    return (
        <div className="vincontrol">
            <div className="vinrequest">
                <FormLabel>VIN Control</FormLabel>
                <TextField name="txtvin" id="vintext" defaultValue="Enter VIN Number" label="Error" helperText="Incorrect Entry" required></TextField>
                <Button name="btnvin" type="submit" variant="contained" color="primary" onClick>Check VIN</Button>
            </div>
            <div className="vininfo">
                <FormLabel>VIN Request Info</FormLabel>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Count</TableCell>
                                <TableCell align="left">Message</TableCell>
                                <TableCell align="left">SearchCriteria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{countStatus}</TableCell>
                                <TableCell>{messageStatus}</TableCell>
                                <TableCell>{searchCriteriaStatus}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="vindata">
                <FormLabel>VIN Request Data</FormLabel>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Item</TableCell>
                                <TableCell align="left">Value</TableCell>
                                <TableCell align="left">ValueId</TableCell>
                                <TableCell align="left">Variable</TableCell>
                                <TableCell align="left">VariableId</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(resultStatus || []).map((row, index) => (
                                <TableRow key="{index + 1}">
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="left">{row.Value}</TableCell>
                                    <TableCell align="left">{row.ValueId}</TableCell>
                                    <TableCell align="left">{row.Variable}</TableCell>
                                    <TableCell align="left">{row.VariableId}</TableCell>
                                </TableRow>
                            )
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

//receives json from api service with
//Count, Message, SearchCriteria and
//Results which is an array of dictionary/hash with
//Value, ValueId, Variable, VariableId
//NOTE - using dummy service response from /vinfetch
//for small dataset retrieval
const VINCheckComponent = (props) => {
    const [apiResponse, setApiResponse] = useState("");
    useEffect(() => {
        async function callAPI() {
            await fetch("/vinfetch")
                .then(res => res.text())
                .then(res => JSON.parse(res))
                .then(res => setApiResponse(res));
        }
        callAPI();
    }, []);
    return <VINCheckData value={apiResponse}/>;
};

export default VINCheckComponent;