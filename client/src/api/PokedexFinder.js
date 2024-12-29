import axios from "axios";

export default axios.create({
  baseURL: "https://pokemon-pern.onrender.com/api/v1/pokedex",
});