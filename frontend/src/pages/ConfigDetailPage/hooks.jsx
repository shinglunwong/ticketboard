import { useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";

export const useFetchConfig = (id) => {
  return useQuery({
    queryKey: ["config", id],
    queryFn: async () => {
      const response = await axios.get(`/configs/${id}`);
      return response.data;
    },
    enabled: id !== "create",
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Config",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
      });
    },
  });
};

export const useUpdateConfig = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/configs/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Config Updated",
        message: "The config has been updated successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/configs");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Updating Config",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useCreateConfig = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/configs/create`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Config Created",
        message: "The config has been created successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/configs");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Creating Config",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useDeleteConfig = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/configs/${id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Config Deleted",
        message: "The config has been deleted successfully.",
        color: "teal",
        icon: <IconTrash size={16} />,
        position: "bottom-center",
      });
      navigate("/configs");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Deleting Config",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};
