import { useState } from "react";
import SearchBar from "components/SearchBar";
import { SEARCH_APIs } from "services/apiCalls";

const Home = () => {
  const [searchString, setSearchString] = useState("");

  const onSearchClick = () => {
    SEARCH_APIs.searchWithTitle(searchString)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchBarChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <>
      <SearchBar
        handleChange={handleSearchBarChange}
        value={searchString}
        onSearchClick={onSearchClick}
      />
    </>
  );
};

export default Home;
