import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]= useState("");
  const navigate= useNavigate();
  const authCtx= useContext(AuthContext);

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    
    if(!email || !password ){
      setError("All fields are mandatory!!");
      return
    }

    try {
    const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa6b1vvHl497ZXR8GOXQbTNEkyd0l5db4', {
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
        setLoading(false);
        const data= await res.json()
        authCtx.login(data.idToken, data.email);
          localStorage.setItem("email",email);
          localStorage.setItem("token", data.idToken);
          navigate('/home');
          console.log('User LoggedIn successfully');
        }
        else{
            setLoading(false);
          const data= await res.json();
            if(data && data.error.message){
              setError("LogIn not successful- " + data.error.message)
            } else{
              setError("Some error occured!! Please try again..")
            }
          }
    } catch (error) {
      console.error('Error logging in :', error);
    }
    setEmail('');
    setPassword("");
    
  };

  return (
    <div className={classes.container}>
      <form className={classes.loginForm} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.errorMessage}>{error}</p>
        {!loading && <button type="submit">Login</button>}
        {loading && <h2>Submitting Data...</h2>}
        <div className={classes.forgotPasswordLink}>
          <Link to="/forgetpassword">Forgot Password?</Link>
        </div>
        <div className={classes.signupLink}>
          <Link to="/"><p>Don't have an account? Sign Up.</p></Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
