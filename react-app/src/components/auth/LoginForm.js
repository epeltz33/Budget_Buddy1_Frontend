  import React, { Component } from 'react'; 
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/session';
import './auth.css';

const LoginForm = () => { // LoginForm is now a functional component instead of a class component  
    const dispatch = useDispatch(); // this is the hook that allows the dispatch function
    const user = useSelector(state => state.session.user); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onLogin = async (e) => { //  this function is called when the user clicks the login button
        e.preventDefault(); // prevent the default behavior of the form
        const data = dispatch(login(email, password)); // call the login thunk and pass in the email and password
        if (data) { 
            setErrors(data);
        }
    };
    
    const updateEmail = (e) => { // this function is called when the user types in the email input
        setEmail(e.target.value); // set the email in state to the value of the input field
    };

    const updatePassword = (e) => { // this function is called when the user types in the password input
        setPassword(e.target.value); // set the password in state to the value of the input field
    };

    if (user) { 
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onLogin}>
            <div className="errors">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className="login-form">
                <div className="LoginInputs">
                <div className="LoginEmail">
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                    id="LoginEmailInput"
                />  
                </div>
                <div className="LoginPassword">
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                    id="LoginPasswordInput"
                />
                </div>
                </div>
                <div id="LoginButton">
                    <span className="LoginButton">
                    <button type="submit"
                    onClick={() => {
                        setEmail('');
                        setPassword('');
                    }}
                    >
                        Login
                    </button>
                    </span>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;