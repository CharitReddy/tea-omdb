import { useEffect } from "react";
import "./App.css";
import { SEARCH_APIs } from "services/apiCalls";
import Home from "pages/Home";

function App() {
  //API Test
  useEffect(() => {
    SEARCH_APIs.searchWithTitle("")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='App'>
      <Home />
    </div>
  );
}

export default App;
