import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import NavbarMenu from '../layouts/NavbarMenu';
import Layout, { Content, Header } from 'antd/lib/layout/layout';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    if (authLoading)
        return (
            <Content>
                <Row type="flex" align="middle">
                    <Col>
                        <Spin indicator={antIcon} style={{ verticalAlign: 'middle' }} />
                    </Col>
                </Row>
            </Content>
        )

    return (
        <Route {...rest} render={
            props => isAuthenticated
                ? (<>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <NavbarMenu />
                    </Header>
                    <Content className="site-layout" style={{ padding: '0', marginTop: 64 }}>
                        <Component {...rest} {...props} />
                    </Content>
                </Layout>
                </>)
                : (<Redirect to="/login" />)
        } />

    )
}

export default ProtectedRoute;