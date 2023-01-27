import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input, Button } from 'antd';
import {HeartTwoTone,getTwoToneColor,setTwoToneColor } from '@ant-design/icons';

export default function Cryptocurrencies ({ topFive, listOfCryptos, addToFavorites}) {

    const count = topFive ? 10 : listOfCryptos.data["stats"]['totalCoins']
    const [cryptos, setCryptos] = useState(listOfCryptos.data.coins);
    const [searchTerm, setSearchTerm] = useState('');
    // const [twoToneColor,settwoToneColor] = useState("blue");
    // const [secondToneColor,setSecondToneColor] = useState("");

    // setTwoToneColor('#000000'); //black color
    //setTwoToneColor('#ff0000') // red color

    // const favoritesButton = () =>{
    //     console.log("I clicked")
    //     setTwoToneColor('#ff0000');
    // }

    // const favoritesCrypto = addToFavorites ()
    
    useEffect(() => {
        setCryptos(listOfCryptos.data.coins);
        const filteredData = listOfCryptos.data.coins.slice(0,count).filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData);
      }, [listOfCryptos, searchTerm]);

    return (
        <>
            {!topFive && (
            <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}/>
            </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
                            <p>Price: {Number(currency.price).toFixed(2)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {currency.change}%</p>
                            {!topFive && <Button onClick={()=>{addToFavorites(currency)}}><HeartTwoTone/></Button>}
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};