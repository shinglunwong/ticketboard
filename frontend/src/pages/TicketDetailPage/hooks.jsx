import { useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";

export const useFetchTicket = (ticketId) => {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: async () => {
      const response = await axios.get(`/tickets/${ticketId}`);
      return response?.data?.ticket;
    },
    enabled: !!ticketId && ticketId !== "create",
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Ticket",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useUpdateTicket = (ticketId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/tickets/${ticketId}`, values);
      return response.data;
    },
    onSuccess: (data, variables) => {
      notifications.show({
        title: "Ticket Updated",
        message: "The ticket has been updated successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate(`/projects/${variables.project_id}/tickets`);
    },
    onError: (error) => {
      notifications.show({
        title: "Error Updating Ticket",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useCreateTicket = (projectId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(`/tickets`, { project_id: projectId, ...values });
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Ticket Created",
        message: "The ticket has been created successfully.",
        color: "teal",
        icon: <IconCheck size={16} />,
        position: "bottom-center",
      });
      navigate(`/projects/${projectId}/tickets`);
    },
    onError: (error) => {
      notifications.show({
        title: "Error Creating Ticket",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};

export const useDeleteTicket = (id, projectId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/tickets/${id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Ticket Deleted",
        message: "The ticket has been deleted successfully.",
        color: "teal",
        icon: <IconTrash size={16} />,
        position: "bottom-center",
      });
      navigate(`/projects/${projectId}/tickets`);
    },
    onError: (error) => {
      notifications.show({
        title: "Error Deleting Ticket",
        message: error.response?.data?.message || error.message,
        color: "red",
        icon: <IconX size={16} />,
        position: "bottom-center",
      });
    },
  });
};
