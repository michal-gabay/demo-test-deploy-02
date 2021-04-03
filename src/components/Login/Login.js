import "./Login.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useState } from 'react';

export default function Login() {
    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const response = await fetch(
            'https://academeez-login-ex.herokuapp.com/api/users/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: 'yariv@nerdeez.com',
                    password: '12345678'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json();
        setIsLoading(false);
        console.log(data);
    }

    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <TextField
                className="form-item"
                type="email"
                required
                id="standard-required"
                label="Enter your email"
            />
            <TextField
                className="form-item"
                type="password"
                required
                id="standard-required"
                label="Enter your password"
            />
            <div className="form-item login-submit-row">
                <Button
                    className="login-submit"
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
                {isLoading &&
                    (
                        <CircularProgress className="login-submit-loading" />
                    )
                }
            </div>
        </form>
    )
}