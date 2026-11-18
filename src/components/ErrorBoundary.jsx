import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MOE Portal Component Crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-gray-50 text-center">
          <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-xl max-w-md w-full">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Portal Notice</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              An unexpected render issue occurred while loading this section. Please reload the portal.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-lagos-green hover:bg-lagos-darkGreen text-white font-bold text-sm px-6 py-2.5 rounded-xl transition shadow"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
