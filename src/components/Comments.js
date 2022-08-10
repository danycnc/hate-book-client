import { useState } from 'react';
import { useDispatch } from 'react-redux';
import fetchPosts from '../hooks/fetchAllPosts';
import useToken from '../hooks/useToken';
import Comment from './Comment';

const Comments = ({ postData, user_id, commentsList }) => {
  const [newComment, setNewComment] = useState();
  const token = useToken();
  const dispatch = useDispatch();

  function handleContent(event) {
    setNewComment(event.target.value);
  }

  function addComment() {
    fetch(`https://hate-bk-svr.herokuapp.com/posts/comments/${postData?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        uid: user_id,
        content: newComment,
      }),
    })
      .then((response) => response.json())
      .then(() => dispatch(fetchPosts(token)))
      .catch((err) => console.log(err.message));

    setNewComment('');
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      addComment();
    }
  }

  return (
    <div className='commentSection'>
      {commentsList &&
        commentsList.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} />
          </div>
        ))}
      <div className='addCommentCnt' onKeyDown={handleEnter}>
        <textarea
          name='comment'
          maxLength={250}
          placeholder={'Leave a comment'}
          rows={1}
          value={newComment}
          onChange={handleContent}></textarea>
        <button
          className='likedBtn'
          disabled={!newComment}
          onClick={addComment}>
          <i className='fa-regular fa-square-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default Comments;
