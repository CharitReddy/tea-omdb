import axios from "axios";

const omdbBaseUrl = process.env.REACT_APP_OMDB_BASE_URL;

export default axios.create({
  baseURL: `${omdbBaseUrl}`,
});
