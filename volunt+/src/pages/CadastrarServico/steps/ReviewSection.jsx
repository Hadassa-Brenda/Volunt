export function ReviewSection({ title, onEdit, children }) {
  return (
    <section className="review-section">
      <div className="review-section-header">
        <h3>{title}</h3>

        <button type="button" onClick={onEdit}>
          Editar
        </button>
      </div>

      <div className="review-section-content">{children}</div>
    </section>
  );
}
