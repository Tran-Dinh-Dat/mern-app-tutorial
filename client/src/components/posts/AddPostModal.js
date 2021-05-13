import { Button, Form, Input, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
    const {showAddPostModal, setShowAddPostModal, addPost} = useContext(PostContext)

    //toast message
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message: message,
        });
    };
    
    // state
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    })

    const resetPostData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        })
        setShowAddPostModal(false);
    }
  

    const {title, description, url} = newPost

    const onChangeNewPostForm = (event) => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const showModal = () => {
        setShowAddPostModal(true);
    };
  
    const handleOk = async () => {
        const {success, message} = await addPost(newPost)
        openNotificationWithIcon('success', message)
        resetPostData()
    };

    
    const handleCancel = () => {
       resetPostData()
    };

    return (
        <>
            <Modal title="Add Post"  visible={showAddPostModal} onOk={handleOk} onCancel={handleCancel}>
            <Form
                    name="basic"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='text'
							placeholder='Title'
							name='title'
                            value={title}
                            onChange={onChangeNewPostForm}
							required
							 />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='textarea'
							placeholder='Description'
							name='description'
                            value={description}
                            onChange={onChangeNewPostForm}
							required
                            />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
							required
							 />
                    </Form.Item>

                    {/* <Form.Item style={{ float: 'right'}}>
                        <Button style={{ marginRight: 5}} type="default"  onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    );
};

export default AddPostModal;