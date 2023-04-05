import { FC } from "react";
import { InputAdornment } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import t from "translations";
interface SearchBarProps {
  handleChange: (value: string) => void;
  value: string;
  onSearchClick: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearSearch: () => void;
}

//Search bar with text input, clear text and search buttons.
const SearchBar: FC<SearchBarProps> = ({
  handleChange,
  value,
  onSearchClick,
  handleClearSearch,
}) => {
  return (
    <>
      <form
        onSubmit={onSearchClick}
        style={{ margin: "1rem", padding: "1rem" }}>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            fontSize: "1 rem",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "5px",
            width: "40%",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
              padding: "0.25rem",
              width: "80%",
            },
          }}
          placeholder={t("searchMoviesInputPlaceholder")}
          inputProps={{ "aria-label": t("searchMoviesLabel") }}
          onChange={(event) => handleChange(event.target.value)}
          value={value}
          endAdornment={
            <>
              {value ? (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={t("clearSearchLabel")}
                    onClick={handleClearSearch}
                    edge='end'
                    disableRipple>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              )}
            </>
          }
        />

        <IconButton
          type='submit'
          sx={{
            p: "10px",
            "&:hover": { backgroundColor: "#ddd" },
          }}
          aria-label={t("searchButtonLabel")}>
          <SearchIcon />
        </IconButton>
      </form>
    </>
  );
};

export default SearchBar;
