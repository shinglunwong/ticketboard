import { useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const useFetchDeployment = (deploymentId) => {
  return useQuery({
    queryKey: ["deployment", deploymentId],
    queryFn: async () => {
      const response = await axios.get(`/deployments/${deploymentId}`);
      return response?.data?.deployment;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Deployment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
    enabled: deploymentId !== "create",
  });
};

export const useCreateDeployment = (projectId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newDeployment) => {
      const response = await axios.post(`/deployments/create`, newDeployment);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Deployment Created",
        message: "The deployment has been created successfully.",
        color: "teal",
        position: "bottom-center",
      });
      navigate(`/projects/${projectId}/deployments`);
    },
    onError: (err) => {
      notifications.show({
        title: "Error Creating Deployment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useUpdateDeployment = (deploymentId) => {
  return useMutation({
    mutationFn: async (updatedDeployment) => {
      const response = await axios.post(`/deployments/${deploymentId}`, updatedDeployment);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Deployment Updated",
        message: "The deployment has been updated successfully.",
        color: "teal",
        position: "bottom-center",
      });
    },
    onError: (err) => {
      notifications.show({
        title: "Error Updating Deployment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useDeleteDeployment = (projectId, deploymentId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/deployments/${deploymentId}/delete`);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Deployment Deleted",
        message: "The deployment has been deleted successfully.",
        color: "teal",
        position: "bottom-center",
      });
      navigate(`/projects/${projectId}/deployments`);
    },
    onError: (err) => {
      notifications.show({
        title: "Error Deleting Deployment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};
