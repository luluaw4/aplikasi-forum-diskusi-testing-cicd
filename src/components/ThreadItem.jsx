import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { showFormattedDate, stripHtml, truncateText } from '../utils';

function ThreadItem({ thread, authUser, onUpVote, onDownVote }) {
  const preview = truncateText(stripHtml(thread.body), 150);
  const owner = thread.owner || { name: 'Pengguna', avatar: '' };
  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? thread.downVotesBy.includes(authUser.id) : false;

  return (
    <article className="thread-card">
      <div className="thread-card__meta-row">
        <span className="thread-card__category">#{thread.category}</span>
        <span>{showFormattedDate(thread.createdAt)}</span>
      </div>

      <Link to={`/threads/${thread.id}`} className="thread-card__title-link">
        <h3>{thread.title}</h3>
      </Link>

      <p className="thread-card__body">{preview}</p>

      <div className="thread-card__footer">
        <div className="thread-card__owner">
          <Avatar src={owner.avatar} name={owner.name} size="small" />
          <div>
            <strong>{owner.name}</strong>
            <p>{thread.totalComments} komentar</p>
          </div>
        </div>

        <VoteButtons
          upCount={thread.upVotesBy.length}
          downCount={thread.downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
    </article>
  );
}

const ownerShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
});

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
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

ThreadItem.defaultProps = {
  authUser: null,
};

export default ThreadItem;
