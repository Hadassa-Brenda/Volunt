export default function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <small id={id} className="user-register-form__error">
      {message}
    </small>
  );
}
