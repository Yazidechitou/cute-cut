import React from 'react'
import axios from 'axios'
import Login from './Login'
import { useNavigate} from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate()

    const signOut = async () =>{
        let myResponse =  await axios.post("signout/")
        try{
            console.log(myResponse.data)
            if (myResponse.data["SignOut"]==true){
                navigate("/")
            }
        }catch(error) {
            alert(error);
        } 
    }    
//   return (
//     <div>
//         <Login/>
//     </div>
//   )
}
