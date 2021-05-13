import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './contants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    // state
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })
    const [showToast, setShowToast]= useState({
        show: true, 
        message: '',
        type: null
    })


    //state show modal add post 
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    // get all posts
    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success) 
            dispatch({
                type: 'POSTS_LOADED_SUCCESS',
                payload: response.data.posts
            })
        } catch (error) {
            dispatch({
                type: 'POSTS_LOADED_FAIL'
            })
            // return error.response.data
            //     ? error.response.data
            //     : { success: false, message: 'Server error'}
        }
    }

    //add post 
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)

            if (response.data.success) {
                dispatch({
                    type: 'ADD_POST',
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    //find post user update
    const findPostById = postId => {
        const post =  postState.posts.find(post => post._id === postId)
        dispatch({
            type: 'FIND_POST',
            payload: post
        })
    }

    //delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success)
            dispatch({
                type: 'DELETE_POST',
                payload: postId
            })
        } catch (error) {
            // return error.response.data ? error.response.data : {success: false, message: 'Server error'}
            console.log(error.message);
        }
    }

    //update post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
            if (response.data.success)
            dispatch({
                type: 'UPDATE_POST',
                payload: response.data.post
            })
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'}
        }
    }

    // post context data
    const postContextData = {
        getAllPosts, 
        addPost, 
        deletePost, 
        findPostById,
        updatePost,
        postState, 
        showAddPostModal, 
        setShowAddPostModal,
        showUpdatePostModal, 
        setShowUpdatePostModal
    }

    return (
        <PostContext.Provider value={postContextData} >
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
