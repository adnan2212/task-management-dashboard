export default function Skeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading tasks"
      className="divide-y divide-gray-100 rounded-xl border border-gray-200 "
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex animate-pulse items-center gap-4 px-4 py-4">
          <div className="h-3 w-1/3 rounded bg-gray-200" />
          <div className="h-3 w-1/6 rounded bg-gray-200" />
          <div className="hidden h-3 w-1/6 rounded bg-gray-200 md:block" />
          <div className="ml-auto h-5 w-20 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}