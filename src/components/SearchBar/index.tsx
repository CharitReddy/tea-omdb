import { FC } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  handleChange: (value: string) => void;
  value: string;
}

const SearchBar: FC<SearchBarProps> = ({ handleChange, value }) => {
  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Movies'
        inputProps={{ "aria-label": "Search Movies" }}
        onChange={(event) => handleChange(event.target.value)}
        value={value}
      />
      <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchBar;
