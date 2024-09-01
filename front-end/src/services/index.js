import axios from "axios";

const getToken = () => {
  return window.localStorage.getItem("authToken")
}
const API_BASE = "http://localhost:8888";

const POST = async (url, data) => {
  const headers = {
    "Content-Type": "application/json",
    authToken: getToken()
  };
  try {
    url = API_BASE + url;
    let reqOption = {}
    reqOption.method = "POST";
    reqOption.url = url;
    reqOption.data = data;
    reqOption.headers = headers;
    const postApiRes = await axios(reqOption);
    return postApiRes.data;
  } catch (err) {
    return err?.response?.data;
  }
};

const GET = async (url, data) => {
  const headers = {
    "Content-Type": "application/json",
    authToken: getToken()
  };
  try {
    url = API_BASE + url;
    const getResponse = await axios.get(url, {
      headers: headers,
      params: data,
    });
    return getResponse.data;
  } catch (err) {
    return err?.response?.data;
  }
};
export { POST, GET };