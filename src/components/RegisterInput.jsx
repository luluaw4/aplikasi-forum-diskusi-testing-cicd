import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function submitHandler(event) {
    event.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <form className="auth-card" onSubmit={submitHandler}>
      <div className="auth-card__header">
        <h2>Buat akun baru</h2>
        <p>Daftar gratis untuk mulai berdiskusi dan berinteraksi.</p>
      </div>
      <label htmlFor="name" className="form-label">Nama</label>
      <input id="name" type="text" className="form-control" value={name} onChange={onNameChange} placeholder="Nama lengkap" required />
      <label htmlFor="register-email" className="form-label">Email</label>
      <input id="register-email" type="email" className="form-control" value={email} onChange={onEmailChange} placeholder="nama@email.com" required />
      <label htmlFor="register-password" className="form-label">Password</label>
      <input id="register-password" type="password" className="form-control" value={password} onChange={onPasswordChange} placeholder="Minimal 6 karakter" required />
      <button type="submit" className="primary-button">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
