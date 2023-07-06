import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../services/api'
import './UserList.css'
import { Link } from 'react-router-dom'


function UserList() {
    const [userDetails , setUserDetails] = useState([])
    const [hoveredUser , setHoveredUser] = useState(null)

   useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await getUserDetails() ;
            setUserDetails(response.data)
        }catch(error){
            console.log("error")
        }
    }
    
    fetchData()
   } ,[])

   const handleMouseEnter = (user) =>{
   
    setHoveredUser(user)
   }

   const handleMouseLeave = ()=>{
    setHoveredUser(null)
   }

   userDetails.sort((a,b)=>a.name.localeCompare(b.name))

  return (
    <div className='user-container'>
        <h4 style={{textAlign:'center' , margin:'20px auto'}}>USERS</h4>
        {userDetails.map((user , index)=> (
            <div key={user.id}
            onMouseEnter={()=>handleMouseEnter({...user , top:`${index * 60}px` , left:'20%'})}
            onMouseLeave={()=>handleMouseLeave()}
            style={{cursor:'pointer'}}
            className={`user-list-item ${hoveredUser && hoveredUser.id ===user.id ? 'active' : '' }`}
            >
                <ul>
                    <li>
                        <Link to={`/users/${user.id}`}><span style={{fontWeight:'500' , marginRight:'10px'}}>Name:</span>{user.name}</Link>
                    </li>
                </ul>
            </div>
    ))}

    {hoveredUser && 
       ( <div className='popup' style={{top:hoveredUser.top , left:hoveredUser.left}}>
          <h3>Name:{hoveredUser.name}</h3>
          <p>Email:{hoveredUser.email}</p>
        </div>)
    }
    </div>
  )
}

export default UserList