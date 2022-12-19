import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import {HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
// import { useState } from 'react'


function App() {
    // const  [user,setUser] = useState(null)
    // async function curr_user(){
    //     const response = await axios.get('curr_user')
    //     const user = response.data && response.data[0] && response.data[0].fields
    //     setUser(user)
    //   }
    return (
        <div className="App">
        <div> 
            <Router >
                <Routes>
                    <Route path="/"  element={<Login/>}/>
                    <Route path="homepage" element={<Homepage/>}/>
                </Routes>
            </Router>
        </div>
        </div>
    )
}

export default App
