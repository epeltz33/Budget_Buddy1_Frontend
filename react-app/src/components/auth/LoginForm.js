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
        const data = await dispatch(login(email, password)); // call the login thunk and pass in the email and password
        if (data) { // if there are errors, set the errors in state
            setErrors(data);
        }
    };