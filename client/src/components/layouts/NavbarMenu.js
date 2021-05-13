import { Button, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import logoutImg from '../../assets/logout.svg';

const NavbarMenu = () => {
    const {
        authState:
        { user: { username }
        },
        logoutUser
    } = useContext(AuthContext);

    const handleLogout = () => logoutUser();
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <img src={logoImg} style={{ width: 32, height: 32, display: 'inline-block' }} />
                <Menu.Item key="1">
                    <Link to="/dashboard" style={{ fontWeight: 'bold' }}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/about" style={{ fontWeight: 'bold' }}>About</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/contact" style={{ fontWeight: 'bold' }}>Contact me</Link>
                </Menu.Item>
                <div key="3" style={{ float: 'right' }}>
                    <Text style={{marginRight: 5}} type="warning">Wellcome 
                        <Text type="warning" style={{fontWeight: 'bold', marginLeft: 2}}>{username}</Text>
                    </Text>
                    <Link to="/" onClick={handleLogout}>
                        <Button type="primary" size="large">
                            <img src={logoutImg} style={{ width: 32, height: 32, display: 'inline-block', padding: 2 }} />
                            logout
                        </Button>
                    </Link>
                </div>
            </Menu>
        </Header>
    );
};

export default NavbarMenu;