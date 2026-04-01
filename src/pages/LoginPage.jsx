import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  function onLogin({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }));
  }

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Login</title>
      </Helmet>
      <div className="auth-page">
        <LoginInput onLogin={onLogin} />
        <p className="auth-helper">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
