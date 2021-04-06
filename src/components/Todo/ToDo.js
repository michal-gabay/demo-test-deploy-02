import "./ToDo.scss";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ToDo() {
    const [todoList, setToDoList] = useState([]);
    const params = useParams();

    const token = useSelector((state) => {
        return state.user.token;
    })

    // useEffect(
    //     () => {
    //         console.log("in here init");
    //         if (params.searchText) {
    //             loadSearchedList(params.searchText);
    //         } else {
    //             loadList();
    //         }
    //     },
    //     []
    // )

    useEffect(
        () => {
            console.log("in here");
            if (params.searchText) {
                loadSearchedList(params.searchText);
            } else {
                loadSearchedList();
            }
        },
        [params]
    )


    const loadSearchedList = async (searchText) => {
        /*
        fetch('https://academeez-login-ex.herokuapp.com/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(
            (response) => {
                return response.json()
            }
        )
        .then((json) => {
            setTodos(json);
        })
        */
        const response = await fetch(
            `https://academeez-login-ex.herokuapp.com/api/tasks`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }            
            // `http://nztodo.herokuapp.com/api/tasks/?format=json&search=${searchText}`
        );
        const data = await response.json();

        console.log(`${data.length} items in the list`);
        setToDoList(data);
    }

    const loadList = async () => {
        console.log("Loading list ... ");
        const response = await fetch(
            'http://nztodo.herokuapp.com/api/tasks/?format=json'
        )
        const data = await response.json();
        console.log(`${data.length} items in the list`);
        setToDoList(data);
    }

    const deleteToDo = async (item) => {
        console.log(`deleting item ${item.title} ...`);
        const response = await fetch(
            `https://nztodo.herokuapp.com/api/task/${item.id}?format=json`,
            {
                method: 'DELETE'
            }
        )
        loadList();
    }

    return (
        <Paper elevation={3} className="paper">
            <div className="list-paper-content">
                <ul class="list-group">
                    {
                        todoList.map(item => {
                            return (
                                <li key={item.id} class="list-group-item">
                                    {item.title}
                                    {/* <button type="button" className="btn btn-danger" onClick={() => deleteToDo(item)}>Delete</button> */}
                                    <IconButton aria-label="delete" onClick={() => deleteToDo(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Paper>
    )
}
