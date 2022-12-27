import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies'
import NewsLetter from './NewsLetter'

export default function Homepage({listOfCryptos,listOfCryptosNews}) {
    return (
        <>
            <Typography.Title level={2} className="heading">Cryptocurrencies Statistics</Typography.Title >
            <Row gutter={[32, 32]}>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={listOfCryptos.data["stats"]['totalCoins']} /></Col>
                <Col span={12}><Statistic title="Total Market Cap:" value={`${millify(listOfCryptos.data["stats"]['totalMarketCap'])}`} /></Col>
            </Row>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">Top 5 Cryptos in The World</Typography.Title >
                <Typography.Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Typography.Title >
            </div>
            <Cryptocurrencies topFive listOfCryptos={listOfCryptos}/>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">Top 5 Crypto News</Typography.Title >
                <Typography.Title level={3}><Link to="/newsletter">Show more</Link></Typography.Title >
            </div>
            <NewsLetter topFive listOfCryptosNews={listOfCryptosNews} listOfCryptos={listOfCryptos}/>
        </>
    );
};