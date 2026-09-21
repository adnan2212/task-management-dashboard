interface Props {
  label: string;
  value: number;
  valueClassName?: string;
}

export default function SummaryCard({ label, value, valueClassName = ""}: Props) {
  return (
    <div className="p-5 rounded-lg bg-gray-900">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-medium ${valueClassName}`}>{value}</p>
    </div>
  )
}