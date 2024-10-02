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

export const handleDownloadPDF = async (paymentId) => {
  try {
    const response = await axios.get(`/payments/${paymentId}/pdf`, {
      responseType: "blob", // Important for handling binary data
    });

    // Create a new Blob object using the response data of the onload object
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `invoice_${paymentId}.pdf`; // Set the file name

    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    // Optionally, display an error notification to the user
  }
};
