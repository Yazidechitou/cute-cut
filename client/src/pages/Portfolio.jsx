// import React, { useState } from 'react'

// export default function Portfolio({addToPortfolio,searchedCoin}) {
//     return (
//         <div>
//             <h1>Portfolio</h1>
//             <button onClick={addToPortfolio}> Add New </button>
//             {/* {searchedCoin && searchedCoin.map((coin)=>{return coin.name})} */}
//             {searchedCoin && 
//                 <Popup trigger={()=>addToPortfolio()} position="right center">
//                     <div>Popup content here !!</div>
//                 </Popup>}
            
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input, Button, Typography, Select } from 'antd';

export default function Portfolio ({listOfCryptos, addToPortfolio, portfolio}) {
    const [cryptoPortfolio, setCryptoPortfolio] = useState(listOfCryptos.data.coins);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCrypto, setNewCrypto] = useState('Bitcoin');
    const [myPortfolio, setMyPortfolio] = useState([])

    
    useEffect(() => {
        // setCryptoPortfolio(listOfCryptos.data.coins);
        const filteredData = listOfCryptos.data.coins.filter((item) => item.name.toLowerCase().includes(newCrypto));
        console.log("Filter Data: " , filteredData)
        setCryptoPortfolio(filteredData);
        setMyPortfolio(addToPortfolio(cryptoPortfolio))
        console.log("myPortfolio: ",myPortfolio)
      }, [listOfCryptos, newCrypto]);

    return (
        <>
            <Typography.Title level={2} className="heading">Your Portfolio!</Typography.Title >
            <div className="search-crypto">
                <Select showSearch className="select-news" placeholder="Add new crypto" optionFilterProp="children" onChange={(value) => setNewCrypto(value)} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {listOfCryptos.data.coins.map((currency) => <Select.Option value={currency.name}>{currency.name}</Select.Option>)}
                </Select>
                <Button onClick={()=>addToPortfolio(newCrypto)}>Add</Button>
            </div>
            {portfolio.length>0 &&
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {myPortfolio.map((item) => (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.uuid}>
                            <Card title={`${item.rank}. ${item.name}`} extra={<img className="crypto-image" src={item.iconUrl} />} hoverable>
                                <p>Price: {Number(item.price).toFixed(2)}</p>
                                <p>Market Cap: {millify(item.marketCap)}</p>
                                <p>Daily Change: {item.change}%</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </>
    );
};
