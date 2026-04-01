import PropTypes from 'prop-types';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { showFormattedDate } from '../utils';

function CommentItem({ comment, authUser, onUpVote, onDownVote }) {
  const owner = comment.owner || { name: 'Pengguna', avatar: '' };
  const isUpVoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? comment.downVotesBy.includes(authUser.id) : false;

  return (
    <article className="comment-card">
      <div className="comment-card__header">
        <div className="comment-card__user">
          <Avatar src={owner.avatar} name={owner.name} size="small" />
          <div>
            <strong>{owner.name}</strong>
            <p>{showFormattedDate(comment.createdAt)}</p>
          </div>
        </div>
        <VoteButtons
          upCount={comment.upVotesBy.length}
          downCount={comment.downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
      <div
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
    </article>
  );
}

const ownerShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
});

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: ownerShape.isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUser: null,
};

export default CommentItem;
