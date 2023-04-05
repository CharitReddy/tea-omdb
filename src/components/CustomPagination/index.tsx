import React, { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface CustomPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  useEffect(() => {}, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default CustomPagination;
