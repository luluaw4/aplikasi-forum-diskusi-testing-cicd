import PropTypes from 'prop-types';

function VoteButtons({
  upCount,
  downCount,
  isUpVoted,
  isDownVoted,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="vote-group">
      <button
        type="button"
        className={`vote-button ${isUpVoted ? 'vote-button--up-active' : ''}`}
        onClick={onUpVote}
        aria-label="Up vote"
        title="Up vote"
      >
        ▲
        <span>{upCount}</span>
      </button>
      <button
        type="button"
        className={`vote-button ${isDownVoted ? 'vote-button--down-active' : ''}`}
        onClick={onDownVote}
        aria-label="Down vote"
        title="Down vote"
      >
        ▼
        <span>{downCount}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upCount: PropTypes.number.isRequired,
  downCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteButtons;
