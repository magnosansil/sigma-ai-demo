interface Props { errors: Record<string, string>; }

export function PaymentFields({ errors }: Props) {
  return (
    <fieldset className="form-section">
      <h2>04 · Pagamento demonstrativo</h2>
      <p className="demo-note">Nenhuma cobrança será realizada. Use somente dados fictícios, por exemplo 4242424242424242.</p>
      <div className="fields" style={{ marginTop: "1rem" }}>
        <Field name="cardName" label="Nome impresso" error={errors.cardName} />
        <Field name="cardNumber" label="Número fictício" inputMode="numeric" maxLength={16} error={errors.cardNumber} />
        <Field name="expiry" label="Validade" placeholder="12/30" maxLength={5} error={errors.expiry} />
        <Field name="cvv" label="CVV fictício" type="password" inputMode="numeric" maxLength={4} error={errors.cvv} />
      </div>
    </fieldset>
  );
}

function Field({ name, label, error, ...props }: { name: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} autoComplete="off" aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />
      {error && <span className="form-error" id={`${name}-error`}>{error}</span>}
    </div>
  );
}
