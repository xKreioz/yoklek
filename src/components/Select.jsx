export function Select({ options, defaultLabel = "Select", ...props }) {
  return (
    <select defaultValue="" style={{ color: 'var(--text-muted)' }} onChange={(e) => e.target.style.color = 'var(--text-main)'} {...props}>
      <option value="" disabled hidden>{defaultLabel}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
