import { Component } from 'react';

/**
 * Catches rendering errors anywhere below it in the tree and shows a
 * friendly fallback instead of a blank white page. Does not expose
 * stack traces to the user.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log for developers; never shown to the end user.
    // eslint-disable-next-line no-console
    console.error('Portfolio crashed:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <h1 style={{ marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Sorry about that — please try reloading the page.
          </p>
          <button className="btn btn-primary" onClick={this.handleReload}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
