import { STATUS_LABELS, STATUS_OPTIONS, STATUS_STYLES } from "@/constants/status";
import type { Status } from "@/types/index";

interface Props {
  value: Status;
  onChange: (status: Status) => void;
  disabled?: boolean;
  label: string;
}

export default function StatusSelect({ value, onChange, disabled, label }: Props) {
  return (
    <div className={`relative inline-block rounded-lg ${STATUS_STYLES[value]}`}>
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as Status)}
        className="cursor-pointer appearance-none rounded-lg bg-transparent py-1 pl-2 pr-6 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-wait disabled:opacity-60"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className=" text-gray-900">
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2"
      >
        <path d="M3 4.5 6 7.5 9 4.5" />
      </svg>
    </div>
  );
}