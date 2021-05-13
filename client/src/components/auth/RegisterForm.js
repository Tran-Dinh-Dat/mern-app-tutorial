import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function RegisterForm(props) {
    //context
    const { registerUser } = useContext(AuthContext)

    // routers
    // const history  = useHistory()
    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    // show alert message
    const [alert, setAlert] = useState(null)

    const { username, password, confirmPassword } = registerForm
    const onChangeRegisterForm = event => setRegisterForm(
        { 
            ...registerForm, 
            [event.target.name]: event.target.value 
        })

    // handle login
    const handleRegister = async event => {
        console.log(event);
        // event.preventDefault();
        if (password !== confirmPassword) {
            setAlert({
                type: 'error',
                message: 'password do not match'
            })
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({
                    type: 'error',
                    message: registerData.message
                })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form onFinish={handleRegister}
                name="normal_login"
                className="login-form"
            >
                <AlertMessage className="m-2" info={alert} />
                <Form.Item
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input 
                        name="username"
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Username" 
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        name="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: 'Confirm password no match!' }]}
                    >
                    <Input
                        name="confirmPassword"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
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
                        Register
            </Button>
            Or <Link to="/login">login now!</Link>
                </Form.Item>
            </Form>

        </>
    );
}

export default RegisterForm;