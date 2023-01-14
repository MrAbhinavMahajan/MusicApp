import React from 'react';
import FallbackUI from './FallbackUI';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, stackTrace: null, hasError: false};
  }

  componentDidCatch(error, stackTrace) {
    this.setState({
      error,
      stackTrace,
      hasError: true,
    });
  }

  render() {
    return this.state.hasError ? (
      <FallbackUI
        error={this.state.error}
        stackTrace={this.state.stackTrace}
        fallbackType={'APP'}
      />
    ) : (
      this.props.children
    );
  }
}
