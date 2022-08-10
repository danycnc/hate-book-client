import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '../hooks/useToken';
import Post from './Post';
import Topbar from './Topbar';
import fetchPosts from '../hooks/fetchAllPosts';

const Feed = () => {
  const [contentPost, setContentPost] = useState();
  const [sendResponse, setSendResponse] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setlikedPosts] = useState();
  const user = useSelector((state) => state.userDataSlicer);
  const posts = useSelector((state) => state.postsSlicer);
  const token = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    ////fetchPosts();
    fetchLikedPosts();
    // fetchUserPosts();
  }, [user]);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  useEffect(() => {
    setContentPost('');
    dispatch(fetchPosts(token));
    // fetchUserPosts();
    //fetchLikedPosts();
  }, [sendResponse]);

  function handleContent(event) {
    setContentPost(event.target.value);
  }

  function fetchLikedPosts() {
    if (user.id) {
      fetch(`http://https://hate-bk-svr.herokuapp.com/posts/likes/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => setlikedPosts(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  function fetchUserPosts() {
    if (user) {
      fetch(`http://https://hate-bk-svr.herokuapp.com/posts/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserPosts(data))
        .catch((error) => {
          fetchPosts();
        });
    }
  }

  function sendPost() {
    fetch('http://https://hate-bk-svr.herokuapp.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        contentPost: contentPost,
        user_id: user.id,
        user_name: user.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSendResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deletePost = (post_id) => {
    fetch(`http://https://hate-bk-svr.herokuapp.com/posts/${post_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setSendResponse(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const editPost = (post_id, modifiedContent) => {
    fetch(`http://https://hate-bk-svr.herokuapp.com/posts/${post_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        modifiedContent: modifiedContent,
        user_id: user.id,
        user_name: user.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setSendResponse(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  function handleEnter(event) {
    if (event.keyCode === 13) {
      sendPost();
    }
  }

  return (
    <div className='feed'>
      <Topbar
        children={
          <section>
            <section className='postCreator' onKeyDown={handleEnter}>
              <textarea
                className='textareaTopbar'
                rows={1}
                name='content'
                maxLength={250}
                placeholder={'Share you hatred for humanity in 250 characters!'}
                onChange={handleContent}
                value={contentPost}></textarea>
              <button
                className='create'
                onClick={sendPost}
                disabled={!contentPost}>
                <i className='fa-regular fa-paper-plane'></i>
              </button>
            </section>
          </section>
        }
      />
      {posts &&
        posts.map((post) => (
          <li key={post.id}>
            {
              <Post
                postData={post}
                user_id={user?.id}
                deletePost={deletePost}
                editPost={editPost}
                likedPosts={likedPosts}
              />
            }
          </li>
        ))}
    </div>
  );
};

export default Feed;
