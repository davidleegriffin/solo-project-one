import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      resetForm();
      return dispatch(sessionActions.signup({ email, username, password }))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    }

    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const resetForm = () => {
    document.getElementById("signupForm").reset();
  };



  return (
    <form onSubmit={handleSubmit} id="signupForm">
      <div className="form-signup__wrapper">
        <div><h2>SIGNUP</h2></div>
        <div className="input-wrapper"></div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-fields--email"
            autoComplete="off"
            required=" "
          />
          <label className="signup-label--email">
            Email
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-fields--username"
            autoComplete="off"
            required=" "
          />
          <label className="signup-label--username">
            Username
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-fields--password"
            autoComplete="new-password"
            required=" "
          />
          <label className="signup-label--password">
            Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-fields--confirm"
            autoComplete="new-password"
            required=" "
            />
          <label className="signup-label--confirm">Confirm Password</label>
        <div>
          <button className="signup-button" type="submit">Sign Up</button>
        </div>
      </div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
    </form>
  );
}

export default SignupFormPage;
