import "./Button.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  icon,
  className = "",
  ...props
}) {
  const buttonClassName = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClassName} type={type} {...props}>
      {icon && <span className="button__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
