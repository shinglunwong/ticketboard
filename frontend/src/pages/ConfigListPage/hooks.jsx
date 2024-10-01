import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export const useFetchConfigs = () => {
  return useQuery({
    queryKey: ["configs"],
    queryFn: async () => {
      const response = await axios.get("/configs");
      return response?.data?.configs || [];
    },
    onError: (err) => {
      notifications.show({
        title: "Error fetching configs",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
      });
    },
  });
};
