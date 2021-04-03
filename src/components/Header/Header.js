import "./Header.scss";
import icon from "./to-do-icon.png";
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


export default function Header() {
    return (
        <AppBar className="page-header" color="secondary" position="static">
            <Toolbar className="top-tool-bar">
                {/* <div className="logo-container"> */}
                <Avatar alt="logo logo" src={icon} className="logo-avatar" />
                {/* </div> */}
                <nav className="navbar">
                    <ul>
                        <li>
                            Home
                    </li>
                        <li>
                            About
                    </li>
                        <li>
                            Todo List
                    </li>
                    </ul>
                </nav>
            </Toolbar>
        </AppBar>
    )
}