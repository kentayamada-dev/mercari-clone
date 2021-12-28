import axios from "axios";

export const axiosPostWrapper = <T>(path: string, dto: T) =>
  axios.post(`http://localhost:8000/${path}`, dto).then((data) => data.data);
