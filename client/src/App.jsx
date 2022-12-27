import { useState, useEffect} from 'react'
import './App.css'
import {HashRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom'
import { Layout, Typography, Space } from 'antd';
import Login from './components/Login'
import Logout from './components/Logout';
import Homepage from './pages/Homepage'
import Cryptocurrencies from './pages/Cryptocurrencies'
import NewsLetter from './pages/NewsLetter'
import Favorites from './pages/Favorites'
import Portfolio from './pages/Portfolio'
import Mynavbar from './components/Mynavbar'
import NoPage from './pages/NoPage'
import axios from 'axios'


function App() {
    const [listOfCryptos, setListOfCryptos] = useState({})
    const [listOfCryptosNews, setListOfCryptosNews] = useState({})
    const [favorites, setFavorites] = useState([])
    const [portfolio, setPortfolio] = useState([])
    const [user, setUser] = useState(null)
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    async function cryptoList (){
        try {
            let response = await axios.get("api/cryptolist/")
            console.log('Response of Crypto List:',response.data)
            setListOfCryptos({...response.data})
            console.log("listOfCryptos: ",listOfCryptos)
        }catch(err) {
            alert(err);
          }
    }

    async function cryptoNews (category){
        try {
            let response = await axios.get(`api/cryptonews/${category}`)
            console.log('Response of Crypto News:',response.data)
            setListOfCryptosNews({...response.data})
            console.log("listOfCryptosNews: ", listOfCryptosNews)
        }catch(err) {
            alert(err);
          }
    }

    const addToFavorites = (crypto) => {
        console.log("I am adding to favorites")
        if (!favorites.includes(crypto)){
            setFavorites((previousFavorites)=>{return [...previousFavorites,crypto]})
        } 
    }

    const removeFromFavorites = (favoriteToRemove) => {
        const index = favorites.indexOf(favoriteToRemove)
        setFavorites(previousFavorites =>{
            const tempListFavorites = [...previousFavorites]
            tempListFavorites.splice(index, 1)
            return tempListFavorites
        })
    }

    const addToPortfolio = (crypto) =>{
        console.log("I am adding to Portfolio")
        console.log(portfolio)
        if (!portfolio.includes(crypto)){
            setPortfolio(crypto)
        }
        return portfolio
    }

    const current_user = async () => {
        let myResponse =  await axios.get("current_user/")
        let currentUser = myResponse.data && myResponse.data[0] && myResponse.data[0].fields
        console.log(currentUser)
        setUser(currentUser)
    }
    useEffect (()=>{current_user()},[user])
    useEffect(cryptoList,[])
    useEffect(()=>{cryptoNews(newsCategory)},[newsCategory])

    return (
        <div className="app">
            <Router >
                <div className="navbar">
                    <Mynavbar user={user}/>
                </div>
                <div className="main">
                    <Layout>
                        <div className="routes">
                            <Routes>
                                <Route path="/"  element={<Login/>}/>
                                <Route path="/homepage" element={<Homepage listOfCryptos={listOfCryptos} listOfCryptosNews={listOfCryptosNews}/>}/>
                                <Route path="/cryptocurrencies"  element={<Cryptocurrencies listOfCryptos={listOfCryptos} addToFavorites={addToFavorites}/>}/>
                                <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites}/>}/>
                                <Route path="/portfolio" element={<Portfolio listOfCryptos={listOfCryptos} addToPortfolio={addToPortfolio} portfolio={portfolio} />}/>
                                <Route path="/newsletter"  element={<NewsLetter listOfCryptosNews={listOfCryptosNews} listOfCryptos={listOfCryptos} newsCategory={newsCategory} setNewsCategory={setNewsCategory}/>}/>
                                <Route path="/signout"  element={<Logout/>}/>
                                <Route path="*" element={<NoPage/>}/>
                            </Routes>
                        </div>
                    </Layout>
                    <div className="footer">
                        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022 <Link to="/"> Crypto Cut Inc.</Link> <br /> All Rights Reserved to Yazide Chitou. </Typography.Title>
                        <Space>
                            <Link to="/">Home</Link>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                            <Link to="/newsLetter">News</Link>
                        </Space>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App
