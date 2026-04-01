import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onRegister({ name, email, password }) {
    dispatch(asyncRegisterUser({ name, email, password, navigate }));
  }

  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Daftar</title>
      </Helmet>
      <div className="auth-page">
        <RegisterInput onRegister={onRegister} />
        <p className="auth-helper">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
