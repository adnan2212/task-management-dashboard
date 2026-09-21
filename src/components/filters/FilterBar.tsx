"use client";

import { useState } from "react";
import FilterFields from "./FilterFields";
import { countActiveFilters, hasActiveFilters, type Filters } from "@/utils/filters";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
  employees: string[];
  stores: string[];
}

export default function FilterBar({ filters, onChange, onClear, employees, stores }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeCount = countActiveFilters(filters);
  const dateRangeInvalid =
    filters.dateFrom !== "" && filters.dateTo !== "" && filters.dateFrom > filters.dateTo;

  return (
    <div className="space-y-3">
      {/* Row 1: search + buttons */}
      <div className="flex gap-2">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by task, employee or store"
          aria-label="Search tasks"
          className="w-full min-w-0 rounded-lg border border-gray-300  px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Mobile: opens the sheet */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-300  px-3 py-2 text-sm hover:bg-gray-50 md:hidden"
        >
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-blue-600 px-1.5 text-xs text-white">{activeCount}</span>
          )}
        </button>

        {/* Desktop: clear button */}
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={onClear}
            className="hidden shrink-0 rounded-lg border border-gray-300  px-3 py-2 text-sm hover:bg-gray-50 md:block"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Row 2 (desktop): the other fields */}
      <div className="hidden grid-cols-3 gap-3 md:grid lg:grid-cols-5">
        <FilterFields filters={filters} onChange={onChange} employees={employees} stores={stores} />
      </div>

      {dateRangeInvalid && (
        <p role="alert" className="text-xs text-red-600">
          "Due from" must be on or before "Due to".
        </p>
      )}

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 max-h-[85vh] space-y-3 overflow-y-auto rounded-t-2xl  p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Filters</h3>
              <button
                type="button"
                onClick={onClear}
                className="text-sm text-blue-700 hover:underline"
              >
                Clear all
              </button>
            </div>

            <FilterFields filters={filters} onChange={onChange} employees={employees} stores={stores} />

            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}