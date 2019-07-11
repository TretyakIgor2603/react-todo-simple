import React from "react";
import ErrorIndicator from "../error-indicator";

class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    console.log(error)
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
