  import React, {useState} from "react";
  import { Redirect } from "react-router-dom";
  import { login } from "../../store/session";
  import { useSelector, useDispatch } from "react-redux";

  const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
       <div className='LoginInputs'>
          <div className='LoginEmail'>
            {/* <label htmlFor='email' id='LoginEmailLabel'>Email</label> */}
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              id='LoginEmailInput'
              placeholder='Email'
            />
          </div>
          <div className='LoginPassword'>
            {/* <label htmlFor='password' id='LoginPasswordLabel'>Password</label> */}
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              id='LoginPasswordInput'
              placeholder='Password'
            />
          </div>
        </div>
        <div id="LoginButtons">
          <span className='LoginButton'>
            <button type='submit'>Login</button>
          </span>
          <span className='DemoButton'>
            <button type='submit'>Demo</button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

           