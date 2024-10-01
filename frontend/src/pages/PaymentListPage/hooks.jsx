import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export const useFetchPayments = (projectId) => {
  return useQuery({
    queryKey: ["payments", projectId],
    queryFn: async () => {
      const response = await axios.get(`/projects/${projectId}/payments`);
      return response.data.payments;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Payments",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
    enabled: !!projectId,
  });
};
