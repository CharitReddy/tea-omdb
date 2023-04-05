import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import t from "translations";
interface CustomPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

//Pagination component that sets and delegates clicked page number to parent
const CustomPagination: FC<CustomPaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>
        {t("paginationPageNumberText")} {page}
      </Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default CustomPagination;
