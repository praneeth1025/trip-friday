import axios from "axios";

const base_url =  `https://jsonplaceholder.typicode.com/`


export const getUserDetails = ()=>{
    try{
        const response =   axios.get(`${base_url}users`)
        return response

    }catch(error){
        console.log("error", error)
    }
}

// get user by id

export const getUserById = (userId)=>{
    try{
        const response = axios.get(`${base_url}users/${userId}`)
        return response

    }catch(error){
        console.log("error", error)
    }
}

// get user posts
export const getUserPosts = (userId)=>{
    try{
        const response = axios.get(`${base_url}users/${userId}/posts`)
        return response

    }catch(error){
        console.log("error", error)
    }
}


// get userAlbum 
export const getUserAlbum = (userId)=>{
    try{
        const response = axios.get(`${base_url}users/${userId}/albums`)
        return response

    }catch(error){
        console.log("error", error)
    }
}


// post comment

export const postComment = async(comment , userId) =>{
    try{
        const response = await axios.post(`${base_url}posts/${userId}/comments` , {comment})
        return response.data
    }catch(error){
        throw error
    }
}


// get comments

export const getComments = async(postId) =>{
    try{
        const response = await axios.get(`${base_url}posts/${postId}/comments`)
        return response
    }catch(error){
        throw error
    }
}


// delete post 
export const deletePost = async (postId) =>{
    try{
        const response = await axios.delete(`${base_url}posts/${postId}`)
        return response.data
    }catch(error){
        throw(error)
    }
}



// get album
export const getUserAlbumPhotos = (userId)=>{
    try{
        const response = axios.get(`${base_url}albums/${userId}/photos`)
        return response

    }catch(error){
        console.log("error", error)
    }
}




