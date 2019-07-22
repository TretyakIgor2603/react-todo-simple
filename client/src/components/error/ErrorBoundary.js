import React from "react";
import ErrorIndicator from "./ErrorIndicator";

class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.error) {
      return <ErrorIndicator />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
