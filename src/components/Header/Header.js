import "./Header.scss";
import icon from "./to-do-icon.png";
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }
}));

export default function Header() {
    const history = useHistory()
    const classes = useStyles();

    const [ searchText, setSearchText ] = useState('');

    const handleSearchTextChange = (event) => {
        // console.log('gggggkkkkkkkkk', event);
        setSearchText(event.target.value);
    }

    const SearchTodos = (event) => {
        if (event.keyCode === 13) {
            console.log('enter pressed');    
            history.push(`/todo/${searchText}`);
        }
        // console.log('ggggg');
        // history.push(`/todo/${searchText}`);
    }

    return (
        <AppBar className="page-header" color="secondary" position="static">
            <Toolbar className="top-tool-bar">
                {/* <div className="logo-container"> */}
                <Avatar alt="logo logo" src={icon} className="logo-avatar" />
                {/* </div> */}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onKeyDown={SearchTodos}
                        onChange={handleSearchTextChange}
                        value={searchText}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <nav className="navbar">
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/todo">
                                Todo List
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Toolbar>
        </AppBar>
    )
}