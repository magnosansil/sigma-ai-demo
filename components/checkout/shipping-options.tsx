export function ShippingOptions() {
  return (
    <fieldset className="form-section">
      <h2>03 · Modalidade</h2>
      <label className="radio-card">
        <input type="radio" name="shipping" value="standard" defaultChecked />
        <span><strong>Padrão</strong><br /><small>3–5 dias úteis · conforme o resumo</small></span>
      </label>
      <label className="radio-card" style={{ marginTop: ".7rem" }}>
        <input type="radio" name="shipping" value="express" />
        <span><strong>Expressa</strong><br /><small>1–2 dias úteis · simulação</small></span>
      </label>
    </fieldset>
  );
}
