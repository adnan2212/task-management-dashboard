interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 rounded-lg border border-red-300  px-3 py-1 text-red-800 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}