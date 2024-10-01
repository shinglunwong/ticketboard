// src/pages/ProjectDetailPage/hooks.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";

export const useFetchProject = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await axios.get(`/projects/${id}`);
      return response.data;
    },
    enabled: id !== "create", // Disable query if creating a project
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Project",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useUpdateProject = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/projects/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Project Updated",
        message: "The project has been updated successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/projects");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Updating Project",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useCreateProject = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/projects/create`, values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Project Created",
        message: "The project has been created successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate("/projects");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Creating Project",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useDeleteProject = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/projects/${id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Project Deleted",
        message: "The project has been deleted successfully.",
        color: "teal",
        icon: <IconTrash size={16} />,
        position: "bottom-center",
      });
      navigate("/projects");
    },
    onError: (error) => {
      notifications.show({
        title: "Error Deleting Project",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useCreateCredit = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/credits`, values);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectId]);
      notifications.show({
        title: "Credit Updated",
        message: "The credit has been updated successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error Updating Credit",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};
