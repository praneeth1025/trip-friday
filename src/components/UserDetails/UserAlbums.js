import React ,{useEffect, useState} from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getUserAlbumPhotos } from '../../services/api';
import { useNavigate , useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './UserAlbums.css'

function UserAlbums({UserAlbums}) {


  const navigate = useNavigate()

    const [albumExpanded , setAlbumExpanded] = useState(false)
    // const [photos , setPhotos] = useState([])


    const handleAlbumToggle = () =>{
        setAlbumExpanded(!albumExpanded)
       }

    const toggleIconClass = albumExpanded ? 'icon-rotated':'icon'




const handlePhotos = async (id) =>{
            
                try{
                    const response = await getUserAlbumPhotos(id)
                    const photos = response.data
  

                    navigate(`/albums/${id}/photos`, { state: { photos } });
                }catch(error){
                    console.log(error)
                }
           

           
    } 

    

  return (
    <div>
        <div className='user-post-container'>
            <div className='user-post-heading' onClick={handleAlbumToggle} >
            
                <h3>Albums</h3>
                <ChevronRightIcon className={toggleIconClass}/>
            </div>
            <div className='row'>
            {
                albumExpanded && UserAlbums && (
                    
                    UserAlbums.map((item)=>(
                        <div className='user-album-body col-m-4 ' key={item.id}>
                            <p onClick={()=>handlePhotos(item.id)}>{item.title}</p>
                            
                        </div>
                    ))
                    
                )
            }

            </div>

        </div>
    </div>
  )
}

export default UserAlbums