import React, { useCallback, useEffect, useState } from 'react';
import './UserPosts.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '../Button';
import { deletePost, getComments, } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteUserPost, saveComments, updateUserPost } from '../../redux/Userposts/UserPostsAction';

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.userPosts);
  const comments = useSelector((state) =>state.userPosts.comments)
  
  console.log(userPosts)


  const [postExpanded, setPostExpanded] = useState(false);
  const [editablePostId, setEditablePostId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [commentText , setCommentText] = useState('')


  const handlePostsToggle = () => {
    setPostExpanded(!postExpanded);
  };


  const toggleIconClass = postExpanded ? 'icon-rotated':'icon'
// delete post
  const handleDeleteUserPost = async (postId) => {
    try {
      dispatch(deleteUserPost(postId));
      await deletePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  // update post
  const handleUpdateUserPost = (postId) => {
    const updatedContent = {
      title: updatedTitle,
      body: updatedBody,
    };
    dispatch(updateUserPost(postId, updatedContent));
    setEditablePostId(null);
  };

  

  // enable edit
  const enableEdit = (postId) => {
    const postToUpdate = userPosts.find((post) => post.id === postId);
    if (postToUpdate) {
      setEditablePostId(postId);
      setUpdatedTitle(postToUpdate.title);
      setUpdatedBody(postToUpdate.body);
    }
  };


const handleCommentSubmit = async(postId) =>{

  const newComment ={
    postId:postId,
    body:commentText
  }

  try{
    dispatch(addComment(postId , newComment));

    setCommentText('')
  }catch(error){
    console.log(error)
  }
}
  // use effect
  // useEffect(() => {
  //   const fetchData = async (postId) => {
  //     try {
  //       const commentResponse = await getComments(postId);
  //       return commentResponse.data;
  //       dispatch(saveComments(postId , comments));
  //     } catch (error) {
  //       console.log(error);
  //       return [];
  //     }
  //   };

  //   const fetchComments = async () => {
  //     for (const post of userPosts) {
  //       const comments = await fetchData(post.id);
  //       post.comments = comments;
        
  //     }
  //   };

  //   fetchComments();
  // }, [userPosts ]);

  useEffect(() => {
    const fetchComments = async (postId) => {
      try {
        const commentResponse = await getComments(postId);
        const comments = commentResponse.data;
        dispatch(saveComments(postId, comments));
      } catch (error) {
        console.log(error);
      }
    };
  
    const updateComments = async () => {
      for (const post of userPosts) {
        if (!post.comments) {
          await fetchComments(post.id);
        }
      }
    };
  
    updateComments();
  }, [userPosts, dispatch]);


 

  return (
    <div className='user-post-wrapper'>
      <div className='user-post-container'>
        <div className='user-post-heading' onClick={handlePostsToggle}>
          <h3>Posts</h3>
          <ChevronRightIcon className={toggleIconClass}/>
        </div>

        {postExpanded &&
          userPosts &&
          userPosts.map((post) => (
            <div className='post-body' key={post.id}>
              {editablePostId === post.id ? (
                <div>
                  <label htmlFor='title'>Title</label>
                  <input
                    id='title'
                    type='text'
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <label htmlFor='body'>Body</label>
                  <input
                    id='body'
                    type='text'
                    value={updatedBody}
                    onChange={(e) => setUpdatedBody(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h4>Title: {post.title}</h4>
                  <p>{post.body}</p>
                </div>
              )}
              <div className='post-buttons'>
                {editablePostId === post.id ? (
                  <Button text='Save' handleButton={() => handleUpdateUserPost(post.id)} />
                ) : (
                  <Button text='Update' handleButton={() => enableEdit(post.id)} />
                )}
                <Button text='Delete' handleButton={() => handleDeleteUserPost(post.id)} />
              </div>

              <h4 style={{ textAlign: 'center', borderTop: '1px solid #000' }}>Comments</h4>

              <div className='post-search'>
                <input placeholder='enter your comment' 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  text='Comment'
                  className='comment-button'
                  handleButton={()=>handleCommentSubmit(post.id)}
                />
              </div>
              {post.comments && 
                 post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p style={{ fontSize: '12px' }}>{comment.body}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserPosts;
