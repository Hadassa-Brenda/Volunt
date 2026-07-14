import React from "react";
import "../../components/ReviewItem/ReviewItem.css";

export function ReviewItem({ label, value }) {
  return (
    <div className="review-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}