import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { IconX } from "@tabler/icons-react";

export const useFetchDeployments = (projectId) => {
  return useQuery({
    queryKey: ["deployments", projectId],
    queryFn: async () => {
      const response = await axios.get(`/projects/${projectId}/deployments`);
      return response?.data?.deployments;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Deployments",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
    enabled: !!projectId, // Only fetch if projectId is available
  });
};
