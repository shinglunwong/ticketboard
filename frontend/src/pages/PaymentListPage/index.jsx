import {
  Container,
  Title,
  Button,
  Group,
  Table,
  Text,
  Badge,
  Loader,
  Center,
  ActionIcon,
} from "@mantine/core";
import { IconArrowBack, IconPlus, IconEdit, IconDownload } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { handleDownloadPDF, useFetchPayments } from "./hooks";
import { paymentStatusOptions } from "../../consts/options";
import { getUserRole } from "../../utils/auth";

const PaymentListPage = () => {
  const userRole = getUserRole();
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Fetch payments with projectId
  const { data: payments, isLoading, isError } = useFetchPayments(projectId);

  const handleCreatePayment = () => {
    navigate(`/projects/${projectId}/payments/create`);
  };

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center style={{ height: "100vh" }}>
        <Title order={4} color="red">
          Failed to load payments.
        </Title>
      </Center>
    );
  }

  // Define table headers
  const headers = (
    <Table.Tr>
      <Table.Th>Title</Table.Th>
      <Table.Th>Description</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Due Date</Table.Th>
      <Table.Th>Payment Date</Table.Th>
      {userRole === "admin" && <Table.Th>Actions</Table.Th>}
    </Table.Tr>
  );

  // Generate table rows
  const rows = payments.map((payment) => (
    <Table.Tr key={payment.id}>
      <Table.Td>
        <Text weight={500}>{payment.title}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{payment.description || "No description provided."}</Text>
      </Table.Td>
      <Table.Td>
        <Text weight={500}>${Number(payment.amount).toFixed(2)}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getOptionColor(payment.status, paymentStatusOptions)} variant="light">
          {payment.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        {payment.due_date ? new Date(payment.due_date).toLocaleDateString() : "N/A"}
      </Table.Td>
      <Table.Td>
        {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "N/A"}
      </Table.Td>
      {userRole === "admin" && (
        <Table.Td>
          <Group spacing="xs">
            <ActionIcon
              color="blue"
              variant="light"
              size="lg"
              onClick={() => navigate(`/projects/${projectId}/payments/${payment.id}`)}
              aria-label={`Edit payment ${payment.title}`}
            >
              <IconEdit size={16} />
            </ActionIcon>
            {(payment.status === "paid" || payment.status === "due") && (
              <ActionIcon
                color="green"
                variant="light"
                size="lg"
                onClick={() => handleDownloadPDF(payment.id)}
                // aria-label={`Download PDF for ${project.name}`}
              >
                <IconDownload size={16} />
              </ActionIcon>
            )}
          </Group>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Container size="xl" my={40}>
      {/* Header Section */}
      <Group mb="md" justify="space-between">
        <Group>
          <Button variant="subtle" color="gray" onClick={() => navigate("/projects")}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>Payments</Title>
        </Group>
        {userRole === "admin" && (
          <Button leftSection={<IconPlus size={16} />} color="teal" onClick={handleCreatePayment}>
            Create Payment
          </Button>
        )}
      </Group>

      {/* Payments List */}
      {payments.length === 0 ? (
        <Center style={{ height: "60vh" }}>
          <Text>No payments found. Click "Create Payment" to add a new one.</Text>
        </Center>
      ) : (
        <Table striped highlightOnHover verticalSpacing="sm">
          <thead>{headers}</thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </Container>
  );
};

// Helper Functions
const getOptionColor = (value, options) => {
  const option = options.find((opt) => opt.value.toString() === value.toString());
  return option ? option.color : "gray";
};

export default PaymentListPage;
