import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function submitHandler(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <form className="auth-card" onSubmit={submitHandler}>
      <div className="auth-card__header">
        <h2>Masuk ke akunmu</h2>
        <p>Login untuk membuat thread, komentar, dan memberi vote.</p>
      </div>
      <label htmlFor="email" className="form-label">Email</label>
      <input id="email" type="email" className="form-control" value={email} onChange={onEmailChange} placeholder="nama@email.com" required />
      <label htmlFor="password" className="form-label">Password</label>
      <input id="password" type="password" className="form-control" value={password} onChange={onPasswordChange} placeholder="Minimal 6 karakter" required />
      <button type="submit" className="primary-button">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
