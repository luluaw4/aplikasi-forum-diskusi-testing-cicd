import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>RuangDiskusi | Halaman Tidak Ditemukan</title>
      </Helmet>
      <div className="empty-state">
        <h2>Halaman tidak ditemukan</h2>
        <p>URL yang kamu buka tidak tersedia di aplikasi ini.</p>
        <Link to="/" className="primary-button">Kembali ke beranda</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
