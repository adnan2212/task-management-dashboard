interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300  px-4 py-12 text-center">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}