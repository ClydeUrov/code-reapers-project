import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getUser = async ({id}) => {
  return await axios
    .get(`user/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

export const getAllAuctions = async () => {
  return await axios
    .get('auctions/all')
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

