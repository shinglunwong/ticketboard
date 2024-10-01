import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Select,
  Textarea,
  NumberInput,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { paymentForm } from "../../consts/forms";
import { paymentStatusOptions } from "../../consts/options";
import { useEffect, useState } from "react";
import { useDeletePayment, useFetchPayment, useUpdatePayment, useCreatePayment } from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { getUserRole } from "../../utils/auth";

const PaymentDetailPage = () => {
  const navigate = useNavigate();
  const { projectId, paymentId } = useParams();

  const isCreateMode = paymentId === "create";
  const role = getUserRole();

  // Fetch payment data only if not in create mode
  const { data: payment, isLoading, isError } = useFetchPayment(paymentId, projectId);

  // Initialize form
  const form = useForm(paymentForm);

  // Define mutations
  const updateMutation = useUpdatePayment(paymentId, projectId);
  const createMutation = useCreatePayment(projectId);
  const deleteMutation = useDeletePayment(projectId, paymentId);

  // State for delete confirmation modal
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleSubmit = (values) => {
    if (isCreateMode) {
      createMutation.mutate({
        project_id: projectId,
        ...values,
      });
    } else {
      updateMutation.mutate(values);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setDeleteModalOpened(false);
  };

  useEffect(() => {
    if (!isCreateMode && payment) {
      form.setValues({
        title: payment.title,
        description: payment.description,
        amount: payment.amount,
        status: payment.status,
        due_date: payment.due_date ? new Date(payment.due_date) : null,
        payment_date: payment.payment_date ? new Date(payment.payment_date) : null,
      });
    } else if (isCreateMode) {
      form.reset();
    }
  }, [payment, isCreateMode]);

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (isError && !isCreateMode) {
    return (
      <Center style={{ height: "100vh" }}>
        <Title order={4} color="red">
          Failed to load payment.
        </Title>
      </Center>
    );
  }

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md" position="apart">
          <Button
            variant="subtle"
            color="gray"
            onClick={() =>
              isCreateMode
                ? navigate(`/projects/${projectId}/payments`)
                : navigate(`/projects/${projectId}/payments/${paymentId}`)
            }
          >
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create Payment" : "Payment Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <TextInput
              label="Title"
              placeholder="Payment Title"
              required
              {...form.getInputProps("title")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <Textarea
              label="Description"
              placeholder="Payment Description"
              {...form.getInputProps("description")}
              autosize
              minRows={4}
            />
            <NumberInput
              label="Amount ($)"
              placeholder="Enter amount"
              required
              min={0}
              precision={2}
              {...form.getInputProps("amount")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <Select
              label="Status"
              placeholder="Select Status"
              data={paymentStatusOptions}
              required
              {...form.getInputProps("status")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <DateInput
              label="Due Date"
              placeholder="YYYY-MM-DD"
              {...form.getInputProps("due_date")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <DateInput
              label="Payment Date"
              placeholder="YYYY-MM-DD"
              {...form.getInputProps("payment_date")}
              disabled={!isCreateMode && role !== "admin"}
            />
          </Stack>
          <Group mt="xl" justify="space-between">
            {!isCreateMode && role === "admin" && (
              <Button
                color="red"
                variant="outline"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteModalOpened(true)}
              >
                Delete Payment
              </Button>
            )}
            <Group>
              <Button
                type="submit"
                color="teal"
                loading={isCreateMode ? createMutation.isLoading : updateMutation.isLoading}
                leftSection={<IconCheck size={16} />}
              >
                {isCreateMode ? "Create Payment" : "Update Payment"}
              </Button>
            </Group>
          </Group>
        </form>

        {!isCreateMode && role === "admin" && (
          <ConfirmationModal
            title="Confirm Deletion"
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            onConfirm={handleDelete}
            isLoading={deleteMutation.isLoading}
          >
            <Text>
              Are you sure you want to delete the payment "<strong>{payment.title}</strong>"?
            </Text>
          </ConfirmationModal>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentDetailPage;
