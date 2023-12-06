import axios from "axios";

const useApi = (auth_token = "") => {
  const uri = process.env.NEXT_PUBLIC_API_URL;
  const header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${auth_token}`,
  };

  const fetchData = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any
  ) => {
    return axios({
      method,
      url: uri + url,
      data,
      headers: header
    })
  };

  return {
    fetchData,
  };
};

export default useApi;
