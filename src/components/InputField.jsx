export default function InputField({
  label,
  value,
  onChange,
  suffix,
  icon: Icon,
}) {
  return (
    <div className="space-y-2">
      
      {/* Label ABOVE */}
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <div className="flex items-center gap-3">
        
        {/* Icon with background */}
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
          {Icon && <Icon size={18} className="text-blue-500" />}
        </div>

        {/* Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full outline-none"
          />
          {suffix && (
            <span className="text-gray-400 ml-2">{suffix}</span>
          )}
        </div>

      </div>
    </div>
  )
}