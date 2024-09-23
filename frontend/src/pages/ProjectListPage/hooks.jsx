import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { IconX } from "@tabler/icons-react";

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(`/projects`);
      return response?.data?.projects;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Projects",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};
