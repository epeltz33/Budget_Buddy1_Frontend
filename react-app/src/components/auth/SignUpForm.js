import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session"; //  import the thunk that will be used to sign up a user
import "./auth.css";


const SignUpForm = () => {
    const dispatch = useDispatch(); 
    const user = useSelector((state) => state.session.user); 
    const [username, setUsername] = React.useState(""); 
    const [email, setEmail] = React.useState(""); 
    const [password, setPassword] = React.useState(""); 
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [errors, setErrors] = React.useState([]); 
    
    const onSignUp = async (e) => {
        e.preventDefault(); //  prevent the default behavior of the form
        if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password)); //  call the sign up thunk and pass in the username, email, and password
        if (data) {
            setErrors(data);
        }
        }
    };
    
    const updateUsername = (e) => {
        setUsername(e.target.value); //  set the username in state to the value of the input field
    };
    
    const updateEmail = (e) => {
        setEmail(e.target.value); //  set the email in state to the value of the input field
    };
    
    const updatePassword = (e) => {
        setPassword(e.target.value); //  set the password in state to the value of the input field
    };
    
    const updateConfirmPassword = (e) => {
        setConfirmPassword(e.target.value); //  set the confirm password in state to the value of the input field
    };
    
    if (user) {
        return <Redirect to="/" />;
    }
    
    return (
        <div className="auth-container">
        <div className="SignUpErrors">
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <form onSubmit={onSignUp}>
           <div className="SignUpUserName">
            <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                placeholder="Username"
                id="SignUpUserNameInput"
            ></input>
            </div>
            <div className="SignUpEmail">
            <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="Email"
                id="SignUpEmailInput"
            ></input>
            </div>
            <div className="SignUpPassword">
            <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder="Password"
                id="SignUpPasswordInput"
            ></input>
            </div>
            <div className="SignUpConfirmPassword">
            <input
                type="password"
                name="confirm_password"
                onChange={updateConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                id="SignUpConfirmPasswordInput"
            ></input>
            </div>
            <div className="SignUpButton">
            <button type="submit" id="SignUpButton">Sign Up</button>
            </div>
        </form>
        </div>
    );
};

export default SignUpForm;
