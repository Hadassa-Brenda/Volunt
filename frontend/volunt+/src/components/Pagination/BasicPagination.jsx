import { Pagination } from "@mui/material";
import * as React from "react";

export function BasicPagination({
  page,
  onPageChange,
  itemsPerPage = 4,
  totalItems = 200,
}) {
  const handlePageChange = (_, value) => {
    onPageChange(value);
  };

  return (
    <div className="pagination-container">
      <Pagination
        showFirstButton
        showLastButton
        count={Math.ceil(totalItems / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="secondary"
      />
    </div>
  );
}
