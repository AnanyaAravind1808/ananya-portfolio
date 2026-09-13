import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';

function NotFound() {
  return (
    <div
      className="container text-center"
      style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <h1>404 — Page not found</h1>
      <p className="section-subtitle">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary mt-lg" style={{ margin: '1.5rem auto 0' }}>
        Back to home
      </a>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
