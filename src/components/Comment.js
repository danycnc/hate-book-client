import useDateFormatter from '../hooks/useDateFormatter';

const Comment = ({ comment }) => {
  const formattedDate = useDateFormatter(comment.createdAt);

  return (
    <div className='comment'>
      <p>{comment.content}</p>
      <span className='commentAuthor'>{comment.User.username}</span>
      <span className='commentDate'>{formattedDate}</span>
    </div>
  );
};

export default Comment;
