import React from 'react'
import axios from 'axios'
import {HashRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function Login() {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common["X-CSRFToken"]=csrftoken
    
    const signIn = async () =>{
        let myResponse = await axios.post("signin/",{"email":document.getElementById("useremail").value,"password":document.getElementById("userpassword").value})
        .then((response)=>{console.log(response.data)
        window.location.href="/#/homepage"})
        .catch((error)=>{console.error})
    }
    const signUp = async () =>{
        let myResponse =  await axios.post("signup/",{"email":document.getElementById("useremail").value,"password":document.getElementById("userpassword").value})
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.error})
    }
    return (
        <div>
            <h1> Welcome to Cryto Cut</h1>
            <label> Email</label> <input id="useremail" placeholder="Enter your email"/><hr/>
            <label> Password</label> <input id="userpassword" type="password" placeholder="Enter your password"/><hr/>
            <button onClick={signIn}> Sign In</button> 
            <button onClick={signUp}> Sign Up</button>
        </div>
    )
}
