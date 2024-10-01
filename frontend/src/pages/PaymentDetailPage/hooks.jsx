import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const useFetchPayment = (paymentId) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const response = await axios.get(`/payments/${paymentId}`);
      return response.data.payment;
    },
    onError: (err) => {
      notifications.show({
        title: "Error Fetching Payment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
    enabled: !!paymentId && paymentId !== "create",
  });
};

export const useCreatePayment = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentData) => {
      const response = await axios.post(`/payments/create`, paymentData);
      return response.data.payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["payments", projectId]);
      notifications.show({
        title: "Payment Created",
        message: "The payment has been created successfully.",
        color: "teal",
        position: "bottom-center",
      });
    },
    onError: (err) => {
      notifications.show({
        title: "Error Creating Payment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useUpdatePayment = (paymentId, projectId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (updatedPayment) => {
      const response = await axios.post(`/payments/${paymentId}`, updatedPayment);
      return response.data.payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["payment", paymentId]);
      queryClient.invalidateQueries(["payments", projectId]);
      navigate(`/projects/${projectId}/payments`);
      notifications.show({
        title: "Payment Updated",
        message: "The payment has been updated successfully.",
        color: "teal",
        position: "bottom-center",
      });
    },
    onError: (err) => {
      notifications.show({
        title: "Error Updating Payment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};

export const useDeletePayment = (projectId, paymentId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/payments/${paymentId}/delete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["payments", projectId]);
      notifications.show({
        title: "Payment Deleted",
        message: "The payment has been deleted successfully.",
        color: "teal",
        position: "bottom-center",
      });
      navigate(`/projects/${projectId}/payments`);
    },
    onError: (err) => {
      notifications.show({
        title: "Error Deleting Payment",
        message: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
        icon: <IconX size={16} />,
      });
    },
  });
};
