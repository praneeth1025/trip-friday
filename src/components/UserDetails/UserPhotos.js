import React from 'react'
import { useLocation } from 'react-router-dom'
import './UserPhotos.css'

function UserPhotos() {
   const location = useLocation()
   const {photos} = location.state


  return (
    <div>
        <h2 style={{textAlign:'center'}}>User Photos</h2>
      
        <div className='row' style={{display:'flex' , flexWrap:'wrap' , justifyContent:'space-between'}}>
        {
            photos.map((photo)=>(
              
                <div key={photo.id} className='col-md-3' >
                  <img src={photo.url} alt={photo.title} style={{maxWidth:'300px'}}/>
                  <p style={{textAlign:'center'}}>{photo.title}</p>
                </div>
             
                
            ))
           
        }
        </div>
        
    </div>
  )
}

export default UserPhotos