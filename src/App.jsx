import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppShell from './components/AppShell';
import LoadingBar from './components/LoadingBar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((states) => states.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return <LoadingBar fullScreen label="Menyiapkan aplikasi..." />;
  }

  return (
    <>
      <LoadingBar />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/threads/:threadId"
            element={(
              <ProtectedRoute>
                <DetailPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/leaderboards"
            element={(
              <ProtectedRoute>
                <LeaderboardsPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/threads/new"
            element={(
              <ProtectedRoute>
                <CreateThreadPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
