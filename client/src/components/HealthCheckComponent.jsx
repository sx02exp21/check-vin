// import React, {Component} from 'react'
import React, {useState, useEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import DoneIcon from '@material-ui/icons/Done';

// class HealthCheckComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { apiResponse: "" };
//     }

//     callAPI() {
//         fetch("/healthcheck")
//             .then(res => res.text())
//             .then(res => this.setState({ apiResponse: res }));
//     }
  
//     componentWillMount() {
//         this.callAPI();
//     }

//     render() {
//         return (
//             <div className="HealthCheckComponent">
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="center">Status</TableCell>
//                             <TableCell align="center">Server</TableCell>
//                             <TableCell align="center">NHTSA</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell align="center"></TableCell>
//                             <TableCell align="center">
//                                 <DoneIcon color='primary'/>
//                             </TableCell>
//                             <TableCell align="center">
//                                 <DoneIcon color='secondary'/>
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </div>
//         );
//     }
// }

// const callAPI = async (setApiResponse) => {
//     await fetch("/healthcheck")
//         .then(res => res.text())
//         .then(res => JSON.parse(res))
//         .then(res => setApiResponse(res));
// };

const HealthCheckComponent = (props) => {
    const [apiResponse, setApiResponse] = useState("");
    // fetch("/healthcheck")
    //     .then(res => res.text())
    //     .then(res => JSON.parse(res))
    //     .then(res => setApiResponse(res))
    // callAPI(setApiResponse);
    useEffect(() => {
        async function callAPI() {
            await fetch("/healthcheck")
                .then(res => res.text())
                .then(res => JSON.parse(res))
                .then(res => setApiResponse(res));
        }
        callAPI();
    }, []);
    return <HealthCheckData value={apiResponse}/>;
};

const HealthCheckData = ({value}) => {
    let serverStatus = value.server;
    let nhtsaStatus = value.nhtsa;
    return (
        <div className="healthdata">
            <FormLabel>Server Health Check</FormLabel>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Server</TableCell>
                        <TableCell align="center">NHTSA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">
                            {
                                serverStatus === "ok" && nhtsaStatus === "ok" ? "ok" : "error"
                            }
                        </TableCell>
                        <TableCell align="center">
                            {
                                serverStatus === "ok" ? <DoneIcon color='primary'/> : <DoneIcon color='secondary'/>
                            }
                        </TableCell>
                        <TableCell align="center">
                            {
                                nhtsaStatus === "ok" ? <DoneIcon color='primary'/> : <DoneIcon color='secondary'/>
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default HealthCheckComponent;