import React, { useContext, useEffect } from 'react'
import { Content } from 'antd/lib/layout/layout'
import { PostContext} from '../contexts/PostContext'
import { Button, Card, Col, Row, Space, Spin, Tooltip, Typography } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContext';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
const { Title } = Typography;

function Dashboard(props) {
    const {authState : {user: { username}}} = useContext(AuthContext)
    // contexts 
    const { 
      postState: {post, posts, postsLoading},
      getAllPosts,
      setShowAddPostModal
    } = useContext(PostContext)

    // start: get all posts
    useEffect(() => getAllPosts(), [])

    let body = null
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    if (postsLoading) {
      body = (
        <Row type="flex" align="middle">
            <Col>
                <Spin indicator={antIcon} style={{ verticalAlign: 'middle' }} />
            </Col>
        </Row>
      )
    } else if(posts.length === 0) {
      body = (
        <>
           <Row>
              <Col span={12} offset={6}>
              <Title level={3}>Wellcome {username}</Title>
              <Button type="warning" onClick={setShowAddPostModal.bind(this, true)}>Learn More</Button>
              </Col>
           </Row>
        </>
      )
    } else {
      body =  (
          <Row className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            { posts.map(post => (
                <SinglePost key={post._id} post={post} />
              )
            )}
            <Tooltip title="Add new lession to learn" color='blue' placement="right">
              <Button onClick={setShowAddPostModal.bind(this, true)} type='primary' style={{ position: 'fixed', bottom: 20, marginRight: 10}} className='add-post-button'>
              <PlusOutlined />
              </Button>
            </Tooltip>
          </Row>
      )
    }

    return (
      <div>
        {body}
        <AddPostModal/>
        { post !== null &&  <UpdatePostModal/>}

        {/* affter add post, show toast message */}
     
      </div>
    )
}

export default Dashboard;