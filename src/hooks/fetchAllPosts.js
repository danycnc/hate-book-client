import { postsSlicer } from '../slicers/postsSlicer';

function fetchAllPosts(token) {
  return (dispatch) => {
    fetch('http://localhost:3000/posts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          postsSlicer.actions.populate(
            data.sort((first, second) => second.id - first.id)
          )
        )
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  };
}

export default fetchAllPosts;
