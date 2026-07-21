import { ExternalLink } from "lucide-react";
import "./InfoItem.css";

export function InfoItem({ icon, label, value, href, external = true }) {
  const content = (
    <>
      <div className="information-item-icon">{icon}</div>

      <div className="information-item-content">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      {href && external && <ExternalLink size={16} />}
    </>
  );

  if (href) {
    return (
      <a
        className="information-item information-item--link"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return <div className="information-item">{content}</div>;
}
