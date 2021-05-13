import React from 'react';
import { Button, Input, Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './LoginFormStyle.scss';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage';

LoginForm.propTypes = {

};

function LoginForm() {
    //context
    const { loginUser } = useContext(AuthContext)

    // routers
    // const history  = useHistory()
    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    // show alert message
    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    // handle login
    const handleLogin = async event => {
        console.log(event);
        // event.preventDefault();

        try {
            const loginData = await loginUser(loginForm)
            if(!loginData.success) {
                setAlert({
                    type: 'error',
                    message: loginData.message
                })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form onFinish={handleLogin}
                name="normal_login"
                className="login-form"
            >
                <AlertMessage className="m-2" info={alert} />
                <Form.Item
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        onChange={onChangeLoginForm}
                        name="username" value={username}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/">
                        Forgot password
            </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
            </Button>
            Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>

        </>
    );
}

export default LoginForm;