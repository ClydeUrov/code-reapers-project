import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// console.log(process.env.REACT_APP_API_URL);

export const getUser = async ({ id }) => {
  return await axios
    .get(`user/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const getAllAuctions = async () => {
  return await axios
    .get("auctions/all")
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const postAuction = async ({ userEmail, data }) => {
  return await axios
    .post(`auctions/create/${userEmail}`, data)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const updateAuction = async ({ data }) => {
  return await axios
    .post(`auctions/update`, data)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const postAuctionImages = async ({ auctionId, data }) => {
  console.log("dataImage", data);
  for (const entry of data.entries()) {
    console.log(entry);
  }
  return await axios
    .post(`images/upload/image/${auctionId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
