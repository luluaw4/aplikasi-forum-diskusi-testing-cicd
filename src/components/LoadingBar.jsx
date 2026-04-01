import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function LoadingBar({ fullScreen = false, label = 'Memuat data...' }) {
  const loading = useSelector((states) => states.loading);

  if (!fullScreen && loading < 1) {
    return null;
  }

  if (fullScreen) {
    return (
      <div className="loading-screen" aria-live="polite">
        <div className="spinner" />
        <p>{label}</p>
      </div>
    );
  }

  return (
    <div className="loading-bar" aria-label={label}>
      <div className="loading-bar__progress" />
    </div>
  );
}

LoadingBar.propTypes = {
  fullScreen: PropTypes.bool,
  label: PropTypes.string,
};

LoadingBar.defaultProps = {
  fullScreen: false,
  label: 'Memuat data...',
};

export default LoadingBar;
