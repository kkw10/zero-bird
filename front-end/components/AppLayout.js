import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

const dummy = {
    nickname: 'Koon',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
}

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode={"horizontal"} >
                <Menu.Item key="home">
                    <Link href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>Profile</a></Link>
                </Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6} >
                    {dummy.isLoggedIn 
                        ?<UserProfile />
                        :<LoginForm />
                    }
                </Col>
                <Col xs={24} md={12} style={{ padding: 10 }}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <div>Made by Koon</div>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node
}

export default AppLayout;