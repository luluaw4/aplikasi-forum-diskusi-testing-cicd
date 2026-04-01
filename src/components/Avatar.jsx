import PropTypes from 'prop-types';
import { getInitials } from '../utils';

function Avatar({ src, name, size = 'medium' }) {
  const safeName = name || 'User';
  const initials = getInitials(safeName);

  return src ? (
    <img className={`avatar avatar--${size}`} src={src} alt={safeName} />
  ) : (
    <div className={`avatar avatar--${size} avatar--fallback`} aria-label={safeName}>
      {initials}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
};

Avatar.defaultProps = {
  src: '',
  name: 'User',
  size: 'medium',
};

export default Avatar;
