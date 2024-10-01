import { useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";

export const useFetchUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    },
    enabled: id !== "create",
    onError: (err) => {
      notifications.show({
        title: "Error Fetching User",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
      });
    },
  });
};

export const useUpdateUser = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/users/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "User Updated",
        message: "The user has been updated successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/users");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Updating User",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/users/create`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "User Created",
        message: "The user has been created successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/users");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Creating User",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useDeleteUser = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/users/${id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "User Deleted",
        message: "The user has been deleted successfully.",
        color: "teal",
        icon: <IconTrash size={16} />,
        position: "bottom-center",
      });
      navigate("/users");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Deleting User",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};
