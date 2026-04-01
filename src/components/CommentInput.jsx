import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ onSubmit }) {
  const [content, onContentChange, setContent] = useInput('');

  function submitHandler(event) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    onSubmit(content);
    setContent('');
  }

  return (
    <form className="form-card" onSubmit={submitHandler}>
      <div className="form-card__header">
        <h3>Tulis komentar</h3>
        <p>Bagikan pendapatmu secara singkat dan jelas.</p>
      </div>
      <textarea
        className="form-control form-control--textarea"
        value={content}
        onChange={onContentChange}
        placeholder="Tulis komentar di sini..."
        rows="5"
      />
      <button type="submit" className="primary-button">Kirim komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentInput;
