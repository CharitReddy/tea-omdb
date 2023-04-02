import { useState } from "react";
import SearchBar from "components/SearchBar";

const Home = () => {
  const [searchString, setSearchString] = useState("");

  const handleSearchBarChange = (value: string) => {
    setSearchString(value);
    console.log(searchString);
  };

  return (
    <>
      <SearchBar handleChange={handleSearchBarChange} value={searchString} />
    </>
  );
};

export default Home;
