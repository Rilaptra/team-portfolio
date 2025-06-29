'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV === 'development') {
        // Tampilkan detail error saat development
        return (
          <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
            <h2>🚨 Error Terjadi</h2>
            <p><strong>{this.state.error?.toString()}</strong></p>
            <pre style={{ whiteSpace: 'pre-wrap', color: 'gray' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        );
      }

      // Production fallback
      return this.props.fallback || (
        <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px' }}>
          <h2>Oops, ada yang rusak... 😵</h2>
          <p>Bagian ini lagi bermasalah, coba refresh halamannya.</p>
        </div>
      );
    }

    return this.props.children || null;
  }
}

export default ErrorBoundary;