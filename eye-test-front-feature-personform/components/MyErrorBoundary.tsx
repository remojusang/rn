import React from 'react';
type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error,
) => React.ReactNode;
type ErrorState = { error?: Error };
type MyErrorBoundaryProps = {
  children: React.ReactNode;
};

function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler,
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      return component(this.props, this.state.error);
    }
  };
}

const MyErrorBoundary = Catch(function MyErrorBoundary(
  props: MyErrorBoundaryProps,
  error?: Error,
) {
  if (error) {
    console.log('error', error);
    return (
      <div className="error-screen">
        <h2>An error has occured</h2>
        <h4>{error.message}</h4>
      </div>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
});

export default MyErrorBoundary;
