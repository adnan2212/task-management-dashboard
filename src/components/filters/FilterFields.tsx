import { STATUS_LABELS, STATUS_OPTIONS } from "@/constants/status";
import type { Filters } from "@/utils/filters";

const control =
  "mt-1 w-full rounded-lg border border-gray-300  px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelText = "text-xs font-medium text-gray-600";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  employees: string[];
  stores: string[];
}

export default function FilterFields({ filters, onChange, employees, stores }: Props) {
  return (
    <>
      <label className="block">
        <span className={labelText}>Employee</span>
        <select
          value={filters.employee}
          onChange={(e) => onChange({ employee: e.target.value })}
          className={control}
        >
          <option value="">All employees</option>
          {employees.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelText}>Store</span>
        <select
          value={filters.store}
          onChange={(e) => onChange({ store: e.target.value })}
          className={control}
        >
          <option value="">All stores</option>
          {stores.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelText}>Status</span>
        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value as Filters["status"] })}
          className={control}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelText}>Due from</span>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange({ dateFrom: e.target.value })}
          className={control}
        />
      </label>

      <label className="block">
        <span className={labelText}>Due to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ dateTo: e.target.value })}
          className={control}
        />
      </label>
    </>
  );
}