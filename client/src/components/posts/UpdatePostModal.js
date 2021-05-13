import { Button, Form, Input, notification, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const UpdatePostModal = () => {
    const {
        postState: {post},
        updatePost, 
        showUpdatePostModal, 
        setShowUpdatePostModal, 
    } = useContext(PostContext)

    //toast message
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message: message,
        });
    };

    
    // state
    const [updatedPost, setUpdatedPost] = useState(post)
    useEffect(() => setUpdatedPost(post), [post])

    const resetPostData = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }
  

    const {title, description, url, status} = updatedPost

    const onChangeUpdatePostForm = (event) => {
        setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
    }

    const showUpdateModal = () => {
        setShowUpdatePostModal(true);
    };
  
    const handleOk = async () => {
        const { success , message } = await updatePost(updatedPost)
        openNotificationWithIcon('success', message)
        resetPostData()
    };

    
    const handleCancel = () => {
       resetPostData()
    };

    return (
        <>
            <Modal title="Update Post" visible={showUpdatePostModal} onOk={handleOk} onCancel={handleCancel}>
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
                            onChange={onChangeUpdatePostForm}
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
                            onChange={onChangeUpdatePostForm}
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
                            onChange={onChangeUpdatePostForm}
							required
							 />
                    </Form.Item>
                    <Form.Item>
                        <select value={status} class='ant-input' name="status" onChange={onChangeUpdatePostForm}>
                            <option value="LEARNING">LEARNING</option>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNED">LEARNED</option>
                        </select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdatePostModal;