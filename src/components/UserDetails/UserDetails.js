
import React, { useEffect, useState } from 'react'
import { getComments, getUserAlbum, getUserById, getUserPosts } from '../../services/api'
import { useParams } from 'react-router-dom'
import Button from '../Button';
import UserPosts from './UserPosts';
import UserAlbums from './UserAlbums';
import { useDispatch } from 'react-redux';
import { comments, setUserPosts } from '../../redux/Userposts/UserPostsAction';

import './UserDetail.css'
import SimpleBackdrop from '../Backdrop';


function UserDetails() {

    const {userId} = useParams();
    const dispatch = useDispatch();

    const [userDetails , setUserDetails] = useState('')

    const [userAlbums , setUserAlbums] = useState('');
    const [isLoading , setIsLoading] = useState(false)


    useEffect(()=>{
        const fetchData = async () =>{
            try{
                setIsLoading(true)
                const response = await getUserById(userId) ;
                const userPostsResponse = await getUserPosts(userId);
                const userAlbumResponse = await getUserAlbum(userId)
             


                setUserDetails(response.data)
                dispatch(setUserPosts(userPostsResponse.data))
                setUserAlbums(userAlbumResponse.data)
                setIsLoading(false)
                
            }catch(error){
                console.log(error)
                setIsLoading(false)
            }
        }
        
        fetchData()
       } ,[])


  return (
    <div className="user-details-container">
        <div>
            <h1 style={{textAlign:"center"}}>User Profile</h1>
            {userDetails && 
            <div>
                <p><span>Name:</span>{userDetails.name}</p>
                <p><span>Email:</span>{userDetails.email}</p>
                <p><span>hone:</span>p{userDetails.phone}</p>
                <p><span>Address:</span>{userDetails.address.street } ,{ userDetails.address.suite },{ userDetails.address.city} ,{ userDetails.address.zipcode}</p>
                <p><span>Occupation:</span>{userDetails.company.name} , {userDetails.company.bs} , {userDetails.company.catchPhrases}</p>
            </div>
            }
        </div>
        
        <div>
            <UserPosts />
            
            
        </div>

        <div>
            <UserAlbums UserAlbums={userAlbums}/>
            
            
        </div>

        {isLoading && <SimpleBackdrop />} 
        
    </div>
  )
}

export default UserDetails