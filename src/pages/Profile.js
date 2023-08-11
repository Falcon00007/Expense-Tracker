import React,{useState} from 'react'
import classes from "./Profile.module.css"

const Profile = () => {
    const [name,setName] = useState("");
    const [profilePhoto, setProfilePhoto]= useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState("");

    const updateHandler=async(e)=>{
        e.preventDefault();
        setLoading(true)

        try {
            const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAa6b1vvHl497ZXR8GOXQbTNEkyd0l5db4', {
              method:'POST',
              body: JSON.stringify({
                idToken:localStorage.getItem("token"),
                displayName:name,
                photoUrl:profilePhoto,
                deleteAttribute:["DISPLAY_NAME"],
                returnSecureToken: true
              }),
              headers: {
                'content-type' : 'application/json'
              }
            })
        
              if(res.ok){
                setLoading(false);
                const data= await res.json()
                  localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
                  localStorage.setItem("token", data.idToken)
                  console.log(data)
                  //navigate('/home');
                  console.log('User LoggedIn successfully');
                  alert("Login successful!!")
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
    }

  return (
    <>
    <h1>This is my User Profile</h1>
    <div>
        <div>Winners never quit, quitters never win</div>
        <div>Your profile is 60% complete.</div>
        <hr />
        <div className={classes.container}>
        <form>
        <h1>Contact Details</h1>
        <div className={classes.form}> 
        <label htmlFor='name'>Full Name: </label>
        <input
        type="text"
        id='name'
        placeholder="Enter Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      </div>
       <div>
       <label htmlFor='name'>Profile Photo URL: </label>
        <input
        type="text"
        id='profilePhoto'
        placeholder="Your profile photo URL..."
        value={profilePhoto}
        onChange={(e) => setProfilePhoto(e.target.value)}
        required
      />
       </div>
       <p className={classes.errorMessage}>{error}</p>
       <button type='submit' onClick={updateHandler}>Update</button>
       {loading && <h2>Submitting Data...</h2>}
       
        </form>
        </div>
    </div>
    </>
  )
}

export default Profile