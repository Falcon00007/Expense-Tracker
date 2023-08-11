import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <h1>Welcome to Expense Tracker!!</h1>
    <h3><i>Your Profile is Incomplete<Link to="/profile"> Complete Now</Link></i></h3>
    </>
  )
}

export default Home