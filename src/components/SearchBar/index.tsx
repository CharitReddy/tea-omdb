import { FC } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import t from "translations";
interface SearchBarProps {
  handleChange: (value: string) => void;
  value: string;
  onSearchClick: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  handleChange,
  value,
  onSearchClick,
}) => {
  return (
    <>
      <form onSubmit={onSearchClick}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("searchMoviesInput")}
          inputProps={{ "aria-label": "Search Movies" }}
          onChange={(event) => handleChange(event.target.value)}
          value={value}
        />
        <IconButton
          type='submit'
          sx={{ p: "10px" }}
          aria-label={t("searchButtonLabel")}>
          <SearchIcon />
        </IconButton>
      </form>
    </>
  );
};

export default SearchBar;
