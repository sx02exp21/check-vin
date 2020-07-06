import React, {useState, useEffect} from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import validate from './FormValidationRules';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Form = () => {
    const [apiResponse, setApiResponse] = useState("");
    const [vinRequest, setVinRequest] = useState("");
    const [inputText, setInputText] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [showResults, setShowResults] = useState(false)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function callAPI() {
            if (vinRequest) {
                let reqPath = "/vinfetch/" + vinRequest;
                await fetch(reqPath)
                    .then(res => res.text())
                    .then(res => JSON.parse(res))
                    .then(res => setApiResponse(res));
                }
        }
        callAPI();
    }, [vinRequest]);

    //Attempting to resolve errorMessage values and
    //render update closure scope for error validation display
    // useEffect(() => {
    //     setErrorMessage(errors.vinRequest);
    // }, []);

    // useEffect(() => {
    //     if (errorMessage) {
    //         console.log(errorMessage);
    //     }
    // }, [errorMessage]);

    let countStatus = apiResponse.Count;
    let messageStatus = apiResponse.Message;
    let searchCriteriaStatus = apiResponse.SearchCriteria;
    let resultStatus = apiResponse.Results;
    // let errors = {};


    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate(vinRequest);

        if (!errors || Object.keys(errors).length === 0) {
            setError(false);
            setIsSubmitted(true);
            setIsValidated(true);
            setShowResults(true);
        } else {
            setError(true);
            setErrorMessage("ERROR:" + errors.vinRequest);
            setShowResults(false);
        }
    }

    // const handleInputChange = (e) => {
    //     const target = e.target;
    //     const value = target.value;
    //     const name = target.name;
    //     setVinRequest(value);
    // }

    const handleClick = (e) => {
        if (isSubmitted)
        {
            setIsSubmitted(false);
        }
        if (isValidated)
        {
            setIsValidated(false);
        }
        setVinRequest(inputText.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="vincontrol">
                <div className="vinrequest">
                    <FormLabel>VIN Control</FormLabel>
                    <TextField name="txtvin" id="vintext" defaultValue="Enter VIN Number" label="Error" helperText="Incorrect Entry" 
                        inputRef={input => {
                            setInputText(input);
                        }} required></TextField>
                    <Button name="btnvin" type="submit" variant="contained" color="primary"
                    onClick={handleClick}>Check VIN</Button>
                </div>
                {showResults &&
                    <Box component="div">
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
                                            <TableRow key={index + 1}>
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
                    </Box>
                }
            </div>
        </form>
    );
};

export default Form;