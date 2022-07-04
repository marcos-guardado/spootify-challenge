import axios from "axios";
import { api } from "../../config";

const authOptions = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      new Buffer(api.clientId + ":" + api.clientSecret).toString("base64"),
  },
  json: true,
};

export const requestMaker = async (url, action, headers, body) => {
  const { data } = await axios({
    method: action,
    url,
    headers,
    data: body,
  });
  return data;
};

export const getToken = async () => {
  return await requestMaker(
    api.authUrl,
    "POST",
    authOptions.headers,
    "grant_type=client_credentials"
  );
};

export const getNewReleases = async () => {
  const { access_token } = await getToken();
  return await requestMaker(`${api.baseUrl}/browse/new-releases`, "GET", {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  });
};

export const getFeaturedPlaylist = async () => {
  const { access_token } = await getToken();
  return await requestMaker(`${api.baseUrl}/browse/featured-playlists`, "GET", {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  });
};

export const getCategories = async () => {
  const { access_token } = await getToken();
  return await requestMaker(`${api.baseUrl}/browse/categories`, "GET", {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  });
};
