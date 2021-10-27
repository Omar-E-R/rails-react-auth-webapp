import React, { useState} from "react";
import {Link} from 'react-router-dom'
import helloImage from "./hello.png"
import WelcomeImage from "./vault.jpg"



const Home = (props) => {
    const [isLoggedIn, setIsLoggedIn]= useState(props.isLoggedIn)
    const handleLogout = (event)=> {
        event.preventDefault()
        setIsLoggedIn(false)
        props.handleLogout()
    }
    if(isLoggedIn){
        return (<><h1>Welcome</h1><div><img src={WelcomeImage} alt="welcome"/></div> <form onSubmit={handleLogout}>
            <button placeholder="submit" type="submit">
                Log Out
            </button>
        </form></>)
    }else {
        return (
            <>
                <div><img src={helloImage} alt="hello"/></div>
                <div>
                    <Link to='/login'>Log In</Link>
                    <br></br>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            </>
        );
    }
};
export default Home;
