import React, { useState } from 'react';
import classes from './Signup.module.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfimrPassword] = useState('');
  const [error, setError]= useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if(!email || !password || !confirmPassword){
      setError("All fields are mandatory!!");
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setPassword("");
      setConfimrPassword("");
      return;
    }
    try {
    const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa6b1vvHl497ZXR8GOXQbTNEkyd0l5db4', {
      method:'POST',
      body: JSON.stringify({
        email:email,
        password:password,
        returnSecureToken: true
      }),
      headers: {
        'content-type' : 'application/json'
      }
    })

      if(res.ok){
        const data= await res.json()
          //authCtx.login(data.idToken, data.email);
          localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
          localStorage.setItem("token", data.idToken)
          console.log(data)
          //navigate('/');
          console.log('User registered successfully');
        }
    } catch (error) {
      console.error('Error signing up:', error);
    }
    setEmail('');
    setPassword("");
    setConfimrPassword("");
    alert("signup done")
  };

  return (
    <>
    <div className={classes.container}>
      <form className={classes.signupForm} onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Re-type Password"
          value={confirmPassword}
          onChange={(e) => setConfimrPassword(e.target.value)}
          required
        />
        <p className={classes.errorMessage}>{error}</p>
        <button type="submit">Sign Up</button>
      </form>
      <div className={classes.loginLink}>
        <p>Have an account?Login</p>       
      </div>
    </div>
    </>
  );
}

export default Signup;
