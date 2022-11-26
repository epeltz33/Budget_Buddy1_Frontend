import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session"; //  import the thunk that will be used to sign up a user
import "./auth.css";


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

    const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
            setErrors(data);
        }
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div className='errors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='SignUpUsername'>
                <input
                    name='username'
                    type='text'
                    value={username}
                    onChange={updateUsername}
                    id='SignUpUsernameInput'
                    placeholder='Username'
                ></input>
            </div>
            <div className='SignUpEmail'>
                <input
                    name='email'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                    id='SignUpEmailInput'
                    placeholder='Email'
                ></input>
            </div>
            <div className='SignUpPassword'>
                <input
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                    id='SignUpPasswordInput'
                    placeholder='Password'
                ></input>
            </div>
            <div className='SignUpRepeatPassword'>
                <input
                    name='repeat_password'
                    type='password'
                    value={repeatPassword}
                    onChange={updateRepeatPassword}
                    id='SignUpRepeatPasswordInput'
                    placeholder='Confirm Password'
                ></input>
            </div>
            <div className= 'SignUpButton'>
                <button type='submit' id='SignUpButton'>Sign Up</button>
            </div>
        </form>
    );
};

export default SignUpForm;
