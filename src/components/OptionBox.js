import "./OptionBox.css";

export function OptionBox({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
}) {
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { id: option, name: option };
    }

    return {
      id: option.id?.toString() ?? option.value?.toString() ?? option.name,
      name: option.name ?? option.label ?? option.value,
    };
  });

  return (
    <div className="option-box-container">
      <label className="option-box-label">{label}</label>
      <select
        className="option-box-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {normalizedOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
