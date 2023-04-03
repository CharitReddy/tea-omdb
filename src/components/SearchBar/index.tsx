import { FC } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import en from "locales/en.json";
interface SearchBarProps {
  handleChange: (value: string) => void;
  value: string;
  onSearchClick: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  handleChange,
  value,
  onSearchClick,
}) => {
  type Translations = {
    [key: string]: string;
  };

  const translations: Translations = en as Translations;

  function t(key: string): string {
    const translation = translations[key];
    return translation || `Missing translation: ${key}`;
  }

  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("searchMoviesInput")}
        inputProps={{ "aria-label": "Search Movies" }}
        onChange={(event) => handleChange(event.target.value)}
        value={value}
      />
      <IconButton
        type='button'
        sx={{ p: "10px" }}
        aria-label={t("searchButtonLabel")}
        onClick={onSearchClick}>
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchBar;
