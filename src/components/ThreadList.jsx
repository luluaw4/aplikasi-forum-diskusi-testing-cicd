import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, authUser, onUpVote, onDownVote }) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <h3>Belum ada thread untuk kategori ini</h3>
        <p>Coba pilih kategori lain atau buat thread baru.</p>
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          authUser={authUser}
          onUpVote={() => onUpVote(thread.id)}
          onDownVote={() => onDownVote(thread.id)}
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

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
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

ThreadList.defaultProps = {
  authUser: null,
};

export default ThreadList;
