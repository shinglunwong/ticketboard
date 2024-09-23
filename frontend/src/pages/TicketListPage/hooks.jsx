import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { IconX } from "@tabler/icons-react";

export const useFetchTickets = (projectId) => {
  return useQuery({
    queryKey: [`project-tickets-${projectId}`],
    queryFn: async () => {
      const response = await axios.get(`/projects/${projectId}/tickets`);
      return response?.data?.tickets;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Tickets",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};
