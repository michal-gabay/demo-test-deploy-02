import "./Login.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const [ formValues, setFormValues ] = useState({
        email: '',
        password: ''
    })

    const getEmptyErrorsObject = () => {
        return {
            email: null,
            password: null
        }
    }

    const [ errors, setErrors ] = useState(getEmptyErrorsObject())

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    const validatePassword = (password) => {
        return password.length > 5;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateValues(formValues)) {
            setIsLoading(true);
            
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
            dispatch({ type: 'SET_TOKEN', payload: data.token });
            history.push('/todo');
        }
    }

    const validateValues = (values) => {
        let isValid = true;

        const email = values.email;
        const password = values.password;

        let newErrors = getEmptyErrorsObject();

        if (!email) {
            isValid = false;
            newErrors.email = 'This field is required';
        } else if (!validateEmail(email)) {
            isValid = false;
            newErrors.email = 'Invalid email formate';
        }

        if (!password) {
            isValid = false;
            newErrors.password = 'This field is required';
        } else if (!validatePassword(password)) {
            isValid = false;
            newErrors.password = 'Password must have at least 5 chars';
        }

        setErrors(newErrors);

        return isValid;
    }

    return (
        <Paper elevation={3} className="paper login-paper">
            <form onSubmit={handleSubmit} className="login-form">
                <TextField
                    className="form-item"
                    type="email"
                    name="email"
                    value={formValues.email}
                    error={errors.email}
                    onChange={handleChange}
                    label={errors.email ? 'Error' : 'Enter your email'}
                    helperText={errors.email}
                />
                <TextField
                    className="form-item"
                    type="password"
                    name="password"
                    value={formValues.password}
                    error={errors.password}
                    onChange={handleChange}
                    label={errors.password ? 'Error' : 'Enter your password'}
                    helperText={errors.password}
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
        </Paper>
    )
}