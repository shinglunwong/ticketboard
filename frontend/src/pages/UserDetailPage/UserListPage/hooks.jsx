import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/users");
      return response?.data?.users || [];
    },
    onError: (err) => {
      notifications.show({
        title: "Error fetching users",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
      });
    },
  });
};
