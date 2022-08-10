import { useEffect, useState } from 'react';
import useDateFormatter from '../hooks/useDateFormatter';
import useToken from '../hooks/useToken';
import Comments from './Comments';
import ConfirmModal from './ConfirmModal';

const Post = ({ postData, user_id, deletePost, editPost, likedPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modifiedContent, setModifiedContent] = useState(postData?.content);
  const [toggleLike, setToggleLike] = useState(false);
  const token = useToken();
  const formattedDate = useDateFormatter(postData.createdAt);
  const isLikedByThisUser = likedPosts?.find(
    (like) => like?.post_id === postData?.id
  );

  useEffect(() => {
    isLikedByThisUser && setToggleLike(true);
  }, [isLikedByThisUser]);

  const handleConfirm = (confirm) => {
    if (!confirm) {
      setOpenConfirm(false);
      return;
    }
    deletePost(postData.id);
  };

  function handleContent(event) {
    setModifiedContent(event.target.value);
  }

  function handleLike() {
    setToggleLike(!toggleLike);

    fetch(
      `https://hate-bk-svr.herokuapp.com/posts/${postData.id}/like/${user_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error.message);
      });
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      setEditModal(false);
      editPost(postData.id, modifiedContent);
    }
  }

  return (
    <div className='post'>
      <section className='topbarPost'>
        <h3>
          {(postData.author_id === user_id && 'You') || postData.author_name}:
        </h3>
        {user_id === postData?.author_id && (
          <div className='cntTopBtn'>
            <button
              className='editPostBtn'
              onClick={() => setEditModal(!editModal)}>
              <i className='fa-regular fa-pen-to-square'></i>
            </button>
            <button
              className='deletePostBtn'
              onClick={() => setOpenConfirm(!openConfirm)}>
              <i className='fa-regular fa-trash-can'></i>
            </button>
          </div>
        )}
      </section>

      {openConfirm && <ConfirmModal handleConfirm={handleConfirm} />}
      {!editModal && (
        <section className='postContent'>
          <p>{postData.content}</p>
          <span>{formattedDate}</span>
        </section>
      )}

      {editModal && (
        <div className='editModal' onKeyDown={handleEnter}>
          <textarea
            name='editContent'
            maxLength={250}
            rows={5}
            placeholder={'max 250 characters'}
            onChange={handleContent}
            value={modifiedContent}></textarea>
          <button
            disabled={!modifiedContent}
            className='saveChangeBtn'
            onClick={() => {
              setEditModal(false);
              editPost(postData.id, modifiedContent);
            }}>
            Save Changes <i className='fa-regular fa-floppy-disk'></i>
          </button>
        </div>
      )}
      <div className='cntBtn'>
        {(toggleLike && (
          <button className='likeBtn liked' onClick={handleLike}>
            Liked <i className='fa-regular fa-thumbs-up'></i>
          </button>
        )) || (
          <button className='likeBtn' onClick={handleLike}>
            Like <i className='fa-regular fa-thumbs-up'></i>
          </button>
        )}
        <button onClick={() => setShowComments(!showComments)}>
          Comments <i className='fa-regular fa-message'></i>{' '}
          {postData.Comment?.length > 0 && `(${postData.Comment.length})`}
        </button>
      </div>

      {showComments && (
        <Comments
          postData={postData}
          user_id={user_id}
          commentsList={postData.Comment}
        />
      )}
    </div>
  );
};

export default Post;
