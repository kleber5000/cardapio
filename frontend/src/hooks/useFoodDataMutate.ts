import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FoodData } from "../components/card/interface/foodData";

const API_URL = "http://localhost:8080";

// Funções para enviar as requisições para o backend
const postData = async (data: FoodData) => {
  return axios.post(API_URL + "/food", data);
};

const updateData = async (data: FoodData) => {
  return axios.put(API_URL + `/food/${data.id}`, data);
};

const deleteData = async (id: number) => {
  return axios.delete(API_URL + `/food/${id}`);
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["food-data"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries(["food-data"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["food-data"]);
    },
  });

  return {
    postMutation,
    updateMutation,
    deleteMutation,
    isSuccess: postMutation.isSuccess || updateMutation.isSuccess || deleteMutation.isSuccess,
    isLoading: postMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
  };
}
