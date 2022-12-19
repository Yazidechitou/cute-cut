import axios from "axios"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from "react";
import { json } from "react-router-dom";

export default function HomePage(){
    const [listOfCryptos, setListOfCryptos] = useState([])
    async function cryptoList (){
        await axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=true")
        .then((response) => {setListOfCryptos(response.data)})
        .catch((error) => {console.log(error)})

        // console.log(response.data.data)
    }

    const signOut = async () =>{
        let myResponse =  await axios.post("signout/",{"email":document.getElementById("useremail").value,"password":document.getElementById("userpassword").value})
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.error})
    }
    
    return(
        <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <Nav.Link href="signOut">SignOut</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            <h1> This is Home Page</h1>
            <button onClick={()=>{cryptoList()}}> Click Me </button>
            <ul>
                {listOfCryptos.map((crypto) => <li> {JSON.stringify(crypto)}</li>)}
            </ul>
        </>
    )
}