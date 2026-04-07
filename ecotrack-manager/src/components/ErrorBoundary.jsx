import { Component } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export class ErrorBoundary extends Component {
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
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-gray-50 to-orange-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-red-200"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6">
                We're sorry for the inconvenience. Our team has been notified and we're working on fixing this.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto">
                  <p className="text-xs font-mono text-red-600 break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  Refresh Page
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Go Home
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Error ID: {Date.now()}
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
