import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({ comments, authUser, onUpVote, onDownVote }) {
  if (comments.length === 0) {
    return (
      <div className="empty-state">
        <h3>Belum ada komentar</h3>
        <p>Jadilah orang pertama yang memulai diskusi di thread ini.</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          authUser={authUser}
          onUpVote={() => onUpVote(comment.id)}
          onDownVote={() => onDownVote(comment.id)}
        />
      ))}
    </div>
  );
}

const ownerShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: ownerShape.isRequired,
  })).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  authUser: null,
};

export default CommentList;
