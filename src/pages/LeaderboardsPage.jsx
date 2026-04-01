import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((states) => states.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Leaderboard</title>
      </Helmet>
      <section className="section-card">
        <div className="section-card__header">
          <div>
            <h2>Leaderboard pengguna aktif</h2>
            <p>Daftar pengguna dengan skor aktivitas tertinggi dari API.</p>
          </div>
        </div>

        <div className="leaderboard-table">
          <div className="leaderboard-table__head">
            <span>Pengguna</span>
            <span>Skor</span>
          </div>
          {leaderboards.map(({ user, score }, index) => (
            <div key={user.id} className="leaderboard-row">
              <div className="leaderboard-user">
                <span className="leaderboard-rank">#{index + 1}</span>
                <Avatar src={user.avatar} name={user.name} size="small" />
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email || 'Pengguna forum'}</p>
                </div>
              </div>
              <strong>{score}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default LeaderboardsPage;
