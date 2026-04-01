import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryFilter from '../components/CategoryFilter';
import ThreadList from '../components/ThreadList';
import { asyncReceiveThreads, asyncToggleThreadVote } from '../states/threads/action';
import { setSelectedCategory } from '../states/selectedCategory/action';
import { getCategories } from '../utils';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((states) => states.threads);
  const selectedCategory = useSelector((states) => states.selectedCategory);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  const categories = useMemo(() => getCategories(threads), [threads]);

  const filteredThreads = useMemo(() => {
    if (selectedCategory === 'all') {
      return threads;
    }

    return threads.filter((thread) => thread.category === selectedCategory);
  }, [threads, selectedCategory]);

  function onSelectCategory(category) {
    dispatch(setSelectedCategory(category));
  }

  function onUpVote(threadId) {
    dispatch(asyncToggleThreadVote({ threadId, voteType: 'up' }));
  }

  function onDownVote(threadId) {
    dispatch(asyncToggleThreadVote({ threadId, voteType: 'down' }));
  }

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Beranda</title>
      </Helmet>
      <div className="page-stack">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Forum Diskusi React + Redux</span>
            <h2>Bangun diskusi yang rapi, responsif, dan mudah dipakai.</h2>
            <p>
              Aplikasi ini memanfaatkan Dicoding Forum API, Redux Store untuk state utama,
              loading indicator, vote optimistik, leaderboard, dan filter kategori.
            </p>
          </div>
        </section>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <section className="section-card">
          <div className="section-card__header">
            <div>
              <h2>Daftar thread</h2>
              <p>{filteredThreads.length} diskusi tersedia</p>
            </div>
          </div>
          <ThreadList
            threads={filteredThreads}
            authUser={authUser}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </section>
      </div>
    </>
  );
}

export default HomePage;
