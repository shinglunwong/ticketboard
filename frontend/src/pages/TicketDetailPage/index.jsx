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
  Loader,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketForm } from "../../consts/forms";
import { ticketPriorityOptions, ticketTypeOptions } from "../../consts/options";
import { useEffect, useState } from "react";
import { useDeleteTicket, useFetchTicket, useUpdateTicket, useCreateTicket } from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { getUserRole } from "../../utils/auth";

const TicketDetailPage = () => {
  const navigate = useNavigate();
  const { projectId, ticketId } = useParams();

  const isCreateMode = ticketId === "create";
  const role = getUserRole();

  // Fetch ticket data only if not in create mode
  const { data: ticket, isLoading, isError } = useFetchTicket(ticketId);

  // Initialize form
  const form = useForm(ticketForm);

  // Define mutations
  const updateMutation = useUpdateTicket(ticketId);
  const createMutation = useCreateTicket(projectId);
  const deleteMutation = useDeleteTicket(ticketId, ticket?.project_id);

  // State for delete confirmation modal
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleSubmit = (values) => {
    if (isCreateMode) {
      createMutation.mutate(values);
    } else {
      updateMutation.mutate(values);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setDeleteModalOpened(false);
  };

  useEffect(() => {
    if (!isCreateMode && ticket) {
      form.setValues({ project_id: projectId, ...ticket });
    } else if (isCreateMode) {
      form.reset();
    }
  }, [ticket, isCreateMode]);

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
          Failed to load ticket.
        </Title>
      </Center>
    );
  }

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md" position="apart">
          <Button variant="subtle" color="gray" onClick={() => navigate(-1)}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create Ticket" : "Ticket Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <Select
              label="Type"
              placeholder="Select type"
              data={ticketTypeOptions}
              required
              {...form.getInputProps("type")}
            />
            <TextInput
              label="Title"
              required
              {...form.getInputProps("title")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <Textarea
              label="Description"
              required
              {...form.getInputProps("description")}
              autosize
              minRows={4}
            />
            <TextInput label="Remarks" {...form.getInputProps("remarks")} />
            <Select
              label="Priority"
              placeholder="Select priority"
              data={ticketPriorityOptions}
              required
              {...form.getInputProps("priority")}
            />
            {/* <NumberInput
              label="Estimated Hours"
              required
              min={0.1}
              step={0.5}
              {...form.getInputProps("estimated_hours")}
            />
            <Select
              label="Status"
              placeholder="Select status"
              data={ticketStatusOptions}
              required
              {...form.getInputProps("status")}
            /> */}
          </Stack>
          <Group mt="xl" justify="space-between">
            {!isCreateMode && role !== "admin" ? (
              <div></div>
            ) : (
              <Button
                color="red"
                variant="outline"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteModalOpened(true)}
              >
                Delete Ticket
              </Button>
            )}
            <Group>
              <Button
                type="submit"
                color="teal"
                loading={isCreateMode ? createMutation.isLoading : updateMutation.isLoading}
                leftSection={<IconCheck size={16} />}
              >
                {isCreateMode ? "Create Ticket" : "Update Ticket"}
              </Button>
            </Group>
          </Group>
        </form>

        {!isCreateMode && (
          <ConfirmationModal
            title="Confirm Deletion"
            opened={deleteModalOpened}
            onClose={() => setDeleteModalOpened(false)}
            onConfirm={handleDelete}
            isLoading={deleteMutation.isLoading}
          />
        )}
      </Paper>
    </Container>
  );
};

export default TicketDetailPage;
