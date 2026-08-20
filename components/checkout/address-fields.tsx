interface Props { errors: Record<string, string>; }

const fields = [
  { name: "postalCode", label: "CEP", placeholder: "01001000" },
  { name: "address", label: "Endereço" },
  { name: "number", label: "Número" },
  { name: "city", label: "Cidade" },
  { name: "state", label: "UF", maxLength: 2 },
];

export function AddressFields({ errors }: Props) {
  return (
    <fieldset className="form-section">
      <h2>02 · Entrega</h2>
      <div className="fields">
        {fields.map(({ name, label, ...props }) => (
          <div className={`field ${name === "address" ? "full" : ""}`} key={name}>
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} {...props} />
            {errors[name] && <span className="form-error" id={`${name}-error`}>{errors[name]}</span>}
          </div>
        ))}
      </div>
    </fieldset>
  );
}
