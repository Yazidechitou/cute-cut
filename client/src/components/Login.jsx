import React , {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';


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
    
    const navigate = useNavigate()
    
    const signIn = async () =>{
        let myResponse = await axios.post("signin/",{"email":document.getElementById("useremail").value,"password":document.getElementById("userpassword").value})
        try {
            console.log(myResponse.data)
            if (myResponse.data["SignIn"]==true){
                navigate("/homepage")
            }
        }catch(error) {
                alert("Your email/password is incorrect. Please try again");
                window.location.reload()
        }        
    }

    const signUp = async () =>{
        let myResponse =  await axios.post("signup/",{"email":document.getElementById("useremail").value,"password":document.getElementById("userpassword").value})
            try{
                console.log(myResponse.data)
                if (myResponse.data["SignUp"]==true){
                    window.location.reload()
                    alert("You can sign in now!")
                }
            }catch(error) {
                alert("You already have an account. Please Sign In");
                window.location.reload()
            }   
    }

    // const current_user = async () => {
    //     let myResponse =  await axios.get("current_user/")
    //     let user = myResponse.data && myResponse.data[0] && myResponse.data[0].fields
    //     setUser(user)
    // }

    // useEffect (()=>{current_user()},[])

    return (
        <div>
            <h1> Welcome to Cryto Cut</h1> <hr/>
            <label> Email</label> <input id="useremail" placeholder="Enter your email"/><hr/>
            <label> Password</label> <input id="userpassword" type="password" placeholder="Enter your password"/><hr/>
            <button onClick={signIn}> Sign In</button> 
            <button onClick={signUp}> Sign Up</button>
        </div>
    )
}
