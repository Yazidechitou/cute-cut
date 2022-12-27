// import React from 'react'
// import Table from 'react-bootstrap/Table'

// export default function Favorites({favorites,setFavorites}) {

//     const removeFromFavorites = (favoriteToRemove) => {
//         const index = favorites.indexOf(favoriteToRemove)
//         setFavorites(previousFavorites =>{
//             const tempListFavorites = [...previousFavorites]
//             tempListFavorites.splice(index, 1)
//             return tempListFavorites
//         })
//     }
//     // console.log(favorites)
//     return (
//         // <ul>
//         //     {favorites.map((favorite,index) =>{return <li key={index}> {JSON.stringify(favorite)} <button onClick={()=>removeFromFavorites(favorite)}> Remove</button></li>})}
//         // </ul>
//         <div>
//             <h1> This is your favorite cryptocurrencies!</h1>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>ID</th>
//                         <th>Symbol</th>
//                         <th>Name</th>
//                         <th>Platforms</th>
//                         <th>Remove</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {favorites.map((favorite,index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{index+1}</td>
//                                 <td> {crypto.id}</td>
//                                 <td> {crypto.symbol}</td>
//                                 <td> {crypto.name}</td>
//                                 <td> {Object.keys(crypto.platforms).map((platform,index)=>{ return <div key={index}>{crypto.platforms[platform]}</div>})}</td>
//                                 <td><button onClick={()=>removeFromFavorites(favorite)}>Remove</button></td>
//                             </tr>     
//                     )})}
//                 </tbody>
//             </Table>
//         </div>
//   )
// }


import React from 'react';
import millify from 'millify';
import { Card, Row, Col, Input, Button, Typography } from 'antd';
import {DislikeOutlined} from '@ant-design/icons';

export default function Favorites ({ favorites, removeFromFavorites}) {

    return (
        <>
            <Typography.Title level={2} className="heading">This is your favorite cryptocurrencies!</Typography.Title >
            <Row gutter={[32, 32]} className="crypto-card-container">
                {favorites.map((favorite) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={favorite.uuid}>
                        <Card title={`${favorite.rank}. ${favorite.name}`} extra={<img className="crypto-image" src={favorite.iconUrl} />} hoverable>
                            <p>Price: {Number(favorite.price).toFixed(2)}</p>
                            <p>Market Cap: {millify(favorite.marketCap)}</p>
                            <p>Daily Change: {favorite.change}%</p>
                            <Button onClick={() => removeFromFavorites(favorite)}><DislikeOutlined /></Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};