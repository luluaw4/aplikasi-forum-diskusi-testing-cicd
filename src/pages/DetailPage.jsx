import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import VoteButtons from '../components/VoteButtons';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleCommentVote,
  asyncToggleDetailThreadVote,
} from '../states/threadDetail/action';
import { showFormattedDate } from '../utils';

function DetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const owner = threadDetail?.owner || { name: 'Pengguna', avatar: '' };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  if (!threadDetail) {
    return <div className="empty-state"><h3>Memuat detail thread...</h3></div>;
  }

  const isUpVoted = authUser ? threadDetail.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? threadDetail.downVotesBy.includes(authUser.id) : false;

  function onCommentSubmit(content) {
    dispatch(asyncAddComment({ threadId, content }));
  }

  function onThreadVote(voteType) {
    dispatch(asyncToggleDetailThreadVote(voteType));
  }

  function onCommentVote(commentId, voteType) {
    dispatch(asyncToggleCommentVote({ threadId, commentId, voteType }));
  }

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Detail Thread</title>
      </Helmet>
      <div className="page-stack">
        <Link to="/" className="back-link">← Kembali ke daftar thread</Link>

        <article className="detail-card">
          <div className="thread-card__meta-row">
            <span className="thread-card__category">#{threadDetail.category}</span>
            <span>{showFormattedDate(threadDetail.createdAt)}</span>
          </div>

          <h2 className="detail-card__title">{threadDetail.title}</h2>

          <div className="detail-card__owner">
            <Avatar src={owner.avatar} name={owner.name} />
            <div>
              <strong>{owner.name}</strong>
              <p>Pembuat thread</p>
            </div>
          </div>

          <div className="rich-text" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />

          <div className="detail-card__actions">
            <VoteButtons
              upCount={threadDetail.upVotesBy.length}
              downCount={threadDetail.downVotesBy.length}
              isUpVoted={isUpVoted}
              isDownVoted={isDownVoted}
              onUpVote={() => onThreadVote('up')}
              onDownVote={() => onThreadVote('down')}
            />
            <span>{threadDetail.comments.length} komentar</span>
          </div>
        </article>

        {authUser ? (
          <CommentInput onSubmit={onCommentSubmit} />
        ) : (
          <div className="notice-card">
            <p>
              Kamu perlu <Link to="/login">login</Link> untuk memberi komentar dan vote.
            </p>
          </div>
        )}

        <section className="section-card">
          <div className="section-card__header">
            <div>
              <h2>Komentar</h2>
              <p>Ikuti percakapan dan berikan vote pada komentar yang membantu.</p>
            </div>
          </div>
          <CommentList
            comments={threadDetail.comments}
            authUser={authUser}
            onUpVote={(commentId) => onCommentVote(commentId, 'up')}
            onDownVote={(commentId) => onCommentVote(commentId, 'down')}
          />
        </section>
      </div>
    </>
  );
}

export default DetailPage;
