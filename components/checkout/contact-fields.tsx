interface Props { errors: Record<string, string>; }

export function ContactFields({ errors }: Props) {
  return (
    <fieldset className="form-section">
      <h2>01 · Contato</h2>
      <div className="fields">
        <Field name="name" label="Nome completo" error={errors.name} />
        <Field name="email" label="E-mail" type="email" error={errors.email} />
        <Field name="phone" label="Telefone" inputMode="numeric" placeholder="11999999999" error={errors.phone} />
      </div>
    </fieldset>
  );
}

function Field({ name, label, error, ...props }: { name: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`field ${name === "phone" ? "" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />
      {error && <span className="form-error" id={`${name}-error`}>{error}</span>}
    </div>
  );
}
