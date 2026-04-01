import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import Avatar from './Avatar';

function Navigation() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  }

  return (
    <header className="topbar">
      <div className="topbar__inner page-container">
        <NavLink to={authUser ? '/' : '/login'} className="brand-link">
          <span className="brand-link__badge">RD</span>
          <div>
            <h1>RuangDiskusi</h1>
            <p>Forum belajar yang simpel, cepat, dan nyaman.</p>
          </div>
        </NavLink>

        <nav className="topnav">
          <NavLink to="/" className="topnav__link">Threads</NavLink>
          <NavLink to="/leaderboards" className="topnav__link">Leaderboard</NavLink>
          {authUser ? (
            <>
              <NavLink to="/threads/new" className="topnav__button">Buat Thread</NavLink>
              <div className="topnav__user">
                <Avatar src={authUser.avatar} name={authUser.name} size="small" />
                <span>{authUser.name}</span>
              </div>
              <button type="button" className="ghost-button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="ghost-button">Login</NavLink>
              <NavLink to="/register" className="topnav__button">Daftar</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
