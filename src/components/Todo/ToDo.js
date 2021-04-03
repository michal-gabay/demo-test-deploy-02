import "./ToDo.scss";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { useState } from 'react';

export default function ToDo() {
    // const todoList = [
    //     { "id": 10103, "title": "title:0.5528453686214214", "description": "description:0.18152234897513764", "group": "group:test", "when": "2020-12-02T20:47:30.105000Z" },
    //     { "id": 10107, "title": "title:0.947375658621904", "description": "description:0.8078580807948683", "group": "group:test", "when": "2020-12-02T20:55:18.105000Z" },
    //     // { "id": 10111, "title": "title:0.2570334367190361", "description": "description:0.6073479672628916", "group": "group:test", "when": "2020-12-02T20:57:08.842000Z" },
    //     // { "id": 10115, "title": "title:0.5745446205534219", "description": "description:0.08513767581919929", "group": "group:test", "when": "2020-12-02T20:57:09.605000Z" },
    //     // { "id": 10127, "title": "title:0.14370076304466117", "description": "description:0.9918283003177242", "group": "group:test", "when": "2020-12-02T20:59:14.139000Z" },
    //     // { "id": 10131, "title": "title:0.7464372402430204", "description": "description:0.5162862549628711", "group": "group:test", "when": "2020-12-02T21:00:44.299000Z" },
    //     // { "id": 10135, "title": "title:0.6973220533470514", "description": "description:0.8197706391124417", "group": "group:test", "when": "2020-12-02T21:00:47.380000Z" },
    //     { "id": 10139, "title": "title:0.8901876427463422", "description": "description:0.6945810718443326", "group": "group:test", "when": "2020-12-02T21:00:48.464000Z" },
    //     { "id": 10143, "title": "title:0.8384168919758677", "description": "description:0.23364966395676", "group": "group:45", "when": "2020-12-02T21:03:55.500000Z" },
    //     { "id": 10147, "title": "title:0.23244723099605213", "description": "description:0.26634139904392606", "group": "group:45", "when": "2020-12-02T21:03:56.245000Z" }
    // ]
    const [todoList, setToDoList] = useState([]);

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
        <div className="list-paper-content">
            { todoList.length === 0 && (
                <Button
                    className="load-list-botton"
                    variant="contained"
                    color="primary"
                    onClick={loadList}
                >
                    Load List
                </Button>
            )}
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
    )
}
