import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold text-heading font-heading">
          Something went wrong
        </h1>
        <p className="text-body">
          An unexpected error occurred. You can try again or go back to the home page.
        </p>

        {error && (
          <pre className="text-left text-sm p-3 bg-surface rounded-lg overflow-auto whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <button
            className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg cursor-pointer"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-lg"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

function handleError(error, info) {
  console.error('ErrorBoundary caught an error:', error, info);
}

export default function AppErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
}
