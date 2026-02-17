


interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
  }

export default function Toggle({
    checked,
    onChange,
    disabled = false,
    label,
  }:ToggleProps) {


  return (
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />

        <div
          className={`
            block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out
            ${checked ? "bg-[#4F97D1]" : "bg-gray-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        <div
          className={`
            absolute left-1 top-1 bg-white w-4 h-4 rounded-full
            transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-4" : ""}
          `}
        />
      </div>

      {label && (
        <div className="ml-3 text-gray-700 font-medium">
          {label}
        </div>
      )}
    </label>
  )
}
