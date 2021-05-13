import { Button } from 'antd';
import { PlayCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

const ActionButtons = ({ url, _id}) => {
    const { deletePost, findPostById, showUpdatePostModal, setShowUpdatePostModal} = useContext(PostContext)
    const selectPostById = (postId) => {
        findPostById(postId)
        setShowUpdatePostModal(true)
    }
    return (
        <>
            <a size='small' href={url} target="_blank">
                <PlayCircleOutlined style={{ color: 'blue' }} />
            </a>
            <EditOutlined onClick={selectPostById.bind(this, _id)} style={{ color: 'green' , paddingLeft: 5}} />
            <DeleteOutlined onClick={deletePost.bind(this, _id)} style={{ color: 'red', paddingLeft: 5 }} />
        </>
    );
};

export default ActionButtons;