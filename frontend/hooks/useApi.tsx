import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface ApiResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

const useApi = (auth_token = "") => {
  const uri = process.env.API_URL;
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const header = {
    "Content-Type": "multipart/form-data;application/json",
    Authorization: `Bearer ${auth_token}`,
  };

  const fetchData = (
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any
  ) => {
    setLoading(true);
    axios({
      method,
      url: uri + url,
      data,
    })
      .then((data: AxiosResponse) => {
        setResponse(data);
        setLoading(false);
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
      });
  };

  return {
    fetchData,
    response,
    loading,
    error,
  };
};

export default useApi;
