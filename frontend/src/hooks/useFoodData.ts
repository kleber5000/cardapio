import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080";

const fetchData = async () => {
  const response = await axios.get(API_URL + "/food");
  return response.data;
};

export function useFoodData() {
  const query = useQuery({
    queryKey: ["food-data"],
    queryFn: fetchData,
    retry: 2,
  });

  return {
    ...query,
    data: query.data,
  };
}
