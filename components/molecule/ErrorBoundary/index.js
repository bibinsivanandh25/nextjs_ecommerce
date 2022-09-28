/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import Image from "next/image";
import * as React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <Image
            layout="fill"
            src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1664188090760-69-http-errors-guide-500-hero.jpg"
            // className="position-fixed top-0 left-0"
          />
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
