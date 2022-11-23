  import React, { Component } from 'react'; 
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/session';
import './auth.css';

const LoginForm = () => { // LoginForm is now a functional component instead of a class component  
    const dispatch = useDispatch(); // this is the hook that allows us to use the dispatch function
    const user = useSelector(state => state.session.user); // this is the hook that allows us to access the user slice of state
    const [email, setEmail] = React.useState(''); 
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);

    const onLogin = async (e) => { //  this function is called when the user clicks the login button
        e.preventDefault(); // prevent the default behavior of the form
        const data = dispatch(login(email, password)); // call the login thunk and pass in the email and password
        if (data) { // if there are errors, set the errors in state
            setErrors(data);
        }
    };
    
    const updateEmail = (e) => { // this function is called when the user types in the email input
        setEmail(e.target.value); // set the email in state to the value of the input field
    };

    const updatePassword = (e) => { // this function is called when the user types in the password input
        setPassword(e.target.value); // set the password in state to the value of the input field
    };

    if (user) { // if the user is logged in, redirect them to the home page
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onLogin}>
            <div>
                {errors.map((error, ind) => ( // if there are errors, display them
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className="LoginInputs">
            <div className="LoginEmail">
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={updateEmail}
                    value={email}
                    id="loginEmailInput"
                    placeholder='Email'
                />
            </div>
            <div className="LoginPassword">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={updatePassword}
                    value={password}
                    id="loginPasswordInput"
                    placeholder='Password'
                />
            </div>
            <div id="LoginButtons">
                <span className='LoginButton'>
                    <button type="submit"
                    onClick={() => {
                        setEmail('');
                        setPassword('');
                    }}
                    >Login</button>
                </span>
            </div>
            </div>
        </form>
    );
};

export default LoginForm;

