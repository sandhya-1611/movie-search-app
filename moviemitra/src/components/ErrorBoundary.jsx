import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {this.props.title || 'Oops! Something went wrong'}
          </h2>
          
          <p className="text-gray-300 mb-6">
            {this.props.message || 'We encountered an unexpected error. Please try again.'}
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={this.handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="text-gray-400 cursor-pointer hover:text-white mb-4">
                🐛 Error Details (Development Only)
              </summary>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-sm">
                <div className="mb-4">
                  <h4 className="text-red-400 font-semibold mb-2">Error:</h4>
                  <pre className="text-red-300 whitespace-pre-wrap">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-red-400 font-semibold mb-2">Stack Trace:</h4>
                  <pre className="text-red-300 whitespace-pre-wrap text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;