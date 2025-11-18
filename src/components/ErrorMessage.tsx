interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md mx-auto p-6">
        <i className="fas fa-exclamation-circle text-5xl text-red-500 mb-4" aria-hidden="true"></i>
        <h3 className="text-xl font-bold text-gray-900 mb-2">發生錯誤</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <i className="fas fa-redo" aria-hidden="true"></i>
            <span>重試</span>
          </button>
        )}
      </div>
    </div>
  );
}
