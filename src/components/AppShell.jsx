import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function AppShell() {
  return (
    <div className="app-shell">
      <Navigation />
      <main className="main-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppShell;
