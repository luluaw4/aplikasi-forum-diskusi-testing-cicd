import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ onSubmit }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function submitHandler(event) {
    event.preventDefault();
    onSubmit({ title, category, body });
  }

  return (
    <form className="form-card" onSubmit={submitHandler}>
      <div className="form-card__header">
        <h2>Buat thread baru</h2>
        <p>Judul yang jelas dan isi yang rapi akan memudahkan orang lain membantu.</p>
      </div>
      <label htmlFor="thread-title" className="form-label">Judul</label>
      <input id="thread-title" type="text" className="form-control" value={title} onChange={onTitleChange} placeholder="Contoh: Cara memahami Redux dengan mudah" required />
      <label htmlFor="thread-category" className="form-label">Kategori</label>
      <input id="thread-category" type="text" className="form-control" value={category} onChange={onCategoryChange} placeholder="redux" required />
      <label htmlFor="thread-body" className="form-label">Isi thread</label>
      <textarea id="thread-body" className="form-control form-control--textarea" value={body} onChange={onBodyChange} placeholder="Tulis isi diskusimu di sini..." rows="10" required />
      <button type="submit" className="primary-button">Publikasikan thread</button>
    </form>
  );
}

ThreadInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ThreadInput;
