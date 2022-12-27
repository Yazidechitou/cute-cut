import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

export default function NewsLetter ({ topFive, listOfCryptosNews, listOfCryptos, newsCategory, setNewsCategory}) {
    const [news,setNews] = useState(listOfCryptosNews)
    console.log(listOfCryptosNews)
    const count = topFive ? 5 : listOfCryptosNews.value.length-1

    return (
        <Row gutter={[24, 24]}>
        {!topFive && (
            <Col span={24}>
            <Select showSearch className="select-news" placeholder="Choose your crypto" optionFilterProp="children" onChange={(value) => setNewsCategory(value)} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Select.Option value="Cryptocurency">Cryptocurrency</Select.Option>
                {listOfCryptos.data.coins.map((currency) => <Select.Option value={currency.name}>{currency.name}</Select.Option>)}
            </Select>
            </Col>
        )}
        {listOfCryptosNews.value.slice(0,count).map((cryptonew, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
                <a href={cryptonew.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                    <Typography.Title className="news-title" level={4}>{cryptonew.name}</Typography.Title>
                    {topFive && <img src={cryptonew?.image?.thumbnail?.contentUrl || cryptonew.provider[0]?.image?.thumbnail?.contentUrl || " "} alt="" />}
                    {!topFive && <img src={cryptonew.provider[0]?.image?.thumbnail?.contentUrl|| cryptonew?.image?.thumbnail?.contentUrl ||" "} alt="" />}
                </div>
                <p>{cryptonew.description.length > 100 ? `${cryptonew.description.substring(0, 50)}...` : cryptonew.description}</p>
                <div className="provider-container">
                    <div>
                    <Avatar src={cryptonew.provider[0]?.image?.thumbnail?.contentUrl||""} alt="" />
                    <Typography.Text className="provider-name">{cryptonew.provider[0].name}</Typography.Text>
                    </div>
                    <Typography.Text>{moment(cryptonew.datePublished).startOf('ss').fromNow()}</Typography.Text>
                </div>
                </a>
            </Card>
            </Col>
        ))}
        </Row>
    );
};