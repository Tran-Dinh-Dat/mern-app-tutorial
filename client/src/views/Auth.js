import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext }from '../contexts/AuthContext'
import { useContext }from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

Auth.propTypes = {
    authRoute: PropTypes.string
};

Auth.defaultProps = {
    authRoute: null
}

function Auth(props) {
    let {authRoute} = props

    const { authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    if (authLoading) 
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col>
                <Spin indicator={antIcon} style={{ verticalAlign: 'middle'}} />
            </Col>
        </Row>
    else if (isAuthenticated)
        return <Redirect to='/dashboard'></Redirect>
    else
        body = (
            <>
                {authRoute === 'login' && <LoginForm/>}
                {authRoute === 'register' && <RegisterForm/>}
            </>
        )

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn mern</h1>
                    <h4>Hello world</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth;