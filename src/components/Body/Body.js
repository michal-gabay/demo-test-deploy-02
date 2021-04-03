import "./Body.scss";

import Paper from '@material-ui/core/Paper';
import Login from "../Login/Login";
import ToDo from "../Todo/ToDo";

export default function Body() {
    return (
        <div className="page-body">
            <Paper elevation={3} className="paper login-paper">
                <Login />
            </Paper>
            <br />
            <Paper elevation={3} className="paper">
                <ToDo />
            </Paper>
        </div>
    )
}