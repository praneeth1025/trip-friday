// uerPosts

export const setUserPosts = (userPosts) =>({
    type:'SET_USER_POSTS',
    payload:userPosts
});

export const updateUserPost = (postId , updatedPost) =>({
    type:'UPDATE_USER_POST',
    payload:{postId , updatedPost}
})


export const deleteUserPost = (postId) =>({
    type:'DELETE_USER_POST',
    payload:postId
})


export const saveComments = (postId, comments) => ({
    type: 'SAVE_COMMENTS',
    payload: {
      postId,
      comments,
    },
  });

  export const addComment = (postId2, comment) => ({
    type: 'ADD_COMMENT',
    payload: {
      postId2,
      comment,
    },
  });