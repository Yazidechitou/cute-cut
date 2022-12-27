import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link , useLocation} from 'react-router-dom';
import { MenuOutlined, HomeOutlined, HeartOutlined, BookOutlined, HighlightOutlined, LogoutOutlined} from '@ant-design/icons';
import cryptoCutLogo from '../images/cryptocut.gif'

export default function Mynavbar ({user}) {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
        setActiveMenu(false);
        } else {
        setActiveMenu(true);
        }
    }, [screenSize]);
    
    const location = useLocation();

    if (location.pathname ==="/") {
            return
    }
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={cryptoCutLogo} size="large" shape="square"/>
                <Typography.Title level={2} className="logo"><Link to="/homepage">Crypto Cut</Link></Typography.Title>
                {/* <Typography.Title level={3} className="show-more">Welcome {user}</Typography.Title > */}
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
            <Menu theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                <Link to="/homepage">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<HeartOutlined />}>
                    <Link to="/favorites">Favorites</Link>
                </Menu.Item>
                <Menu.Item icon={<BookOutlined />}>
                    <Link to="/portfolio">Portfolio</Link>
                </Menu.Item>
                <Menu.Item icon={<HighlightOutlined />}>
                    <Link to="/newsletter">NewsLetter</Link>
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />}>
                    <Link to="/">SignOut</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
    );
};

