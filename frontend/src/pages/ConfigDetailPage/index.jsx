import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Select,
  Loader,
  Center,
  PasswordInput,
  Divider,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { configForm } from "../../consts/forms";
import { useEffect, useState } from "react";
import { useCreateConfig, useDeleteConfig, useFetchConfig, useUpdateConfig } from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";

const ConfigDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = id === "create";

  // Fetch config data
  const { data: configData, isLoading, isError } = useFetchConfig(id);

  // Initialize form
  const form = useForm(configForm);

  // Mutations
  const updateMutation = useUpdateConfig(id);
  const deleteMutation = useDeleteConfig(id);
  const createMutation = useCreateConfig();

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
    if (!isCreateMode && configData?.config) {
      form.setValues(configData.config);
    } else if (isCreateMode) {
      form.reset();
    }
  }, [configData, isCreateMode]);

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
          Failed to load config.
        </Title>
      </Center>
    );
  }

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md">
          <Button variant="subtle" color="gray" onClick={() => navigate("/configs")}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create Config" : "Config Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <TextInput label="Key" required {...form.getInputProps("key")} />
            <Textarea
              label="Value"
              required
              {...form.getInputProps("value")}
              autosize
              minRows={4}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            {!isCreateMode ? (
              <Button
                color="red"
                variant="outline"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteModalOpened(true)}
              >
                Delete Config
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              type="submit"
              color="teal"
              loading={updateMutation.isLoading}
              leftSection={<IconCheck size={16} />}
            >
              {isCreateMode ? "Create Config" : "Update Config"}
            </Button>
          </Group>
        </form>

        <ConfirmationModal
          title={"Confirm Deletion"}
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          onConfirm={handleDelete}
          isLoading={deleteMutation.isLoading}
        />
      </Paper>
    </Container>
  );
};

export default ConfigDetailPage;
