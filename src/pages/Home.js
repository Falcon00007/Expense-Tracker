import React,{useState} from 'react'
import classes from './Home.module.css' 
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from "react-icons/bs";

const Home = () => {
  const [error, setError]= useState("");

  const verifyHandler=(e)=>{
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa6b1vvHl497ZXR8GOXQbTNEkyd0l5db4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
        if (res.ok) {
           res.json().then((data) => {
            console.log(data);
          })
        } else {
          res.json().then((data) => {
            if (data && data.error && data.error.message) {
              setError("Verification mail not sent... try again"+ data.error.message);
            }else{
              setError("Some error occured!! Please try again..")
            }
          });
        }
      }).catch((err) => {
        console.log("Some error in sending verification mail - " + err);
      });
  }

  return (
    <>
    <div className={classes.header}>
    <h1>Welcome to Expense Tracker!!</h1>
    <h3><i>Your Profile is Incomplete <Link to="/profile">Complete Now</Link></i></h3>
    </div>
    <div className={classes.container}>
        <h2>Verify your email </h2>
        <button className={classes.verifyBtn} onClick={verifyHandler}>
          Verify Email <BsFillCheckCircleFill/>
        </button>
      </div>
      <p className={classes.errorMessage}>{error}</p>
    </>
  )
}

export default Home