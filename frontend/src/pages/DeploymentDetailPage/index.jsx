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
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { deploymentForm } from "../../consts/forms";
import { deploymentPlatformOptions } from "../../consts/options";
import { useEffect, useState } from "react";
import {
  useDeleteDeployment,
  useFetchDeployment,
  useUpdateDeployment,
  useCreateDeployment,
} from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { getUserRole } from "../../utils/auth";

const DeploymentDetailPage = () => {
  const navigate = useNavigate();
  const { projectId, deploymentId } = useParams();

  const isCreateMode = deploymentId === "create";
  const role = getUserRole();

  // Fetch deployment data only if not in create mode
  const { data: deployment, isLoading, isError } = useFetchDeployment(deploymentId);

  // Initialize form
  const form = useForm(deploymentForm);

  // Define mutations
  const updateMutation = useUpdateDeployment(deploymentId);
  const createMutation = useCreateDeployment(projectId);
  const deleteMutation = useDeleteDeployment(projectId, deploymentId);

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
    if (!isCreateMode && deployment) {
      form.setValues({
        title: deployment.title,
        description: deployment.description,
        platform: deployment.platform,
        deployed_at: new Date(deployment.deployed_at),
        // deployed_at: deployment.deployed_at
        //   ? new Date(deployment.deployed_at).toISOString().split("T")[0]
        //   : "",
      });
    } else if (isCreateMode) {
      form.reset();
    }
  }, [deployment, isCreateMode]);

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
          Failed to load deployment.
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
                ? navigate(`/projects/${projectId}/deployments`)
                : navigate(`/projects/${projectId}/deployments/${deploymentId}`)
            }
          >
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create Deployment" : "Deployment Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <TextInput
              label="Title"
              placeholder="Deployment Title"
              required
              {...form.getInputProps("title")}
              disabled={!isCreateMode && role !== "admin"}
            />
            <Textarea
              label="Description"
              placeholder="Deployment Description"
              required
              {...form.getInputProps("description")}
              autosize
              minRows={4}
            />
            <Select
              label="Platform"
              placeholder="Select Platform"
              data={deploymentPlatformOptions}
              required
              {...form.getInputProps("platform")}
            />
            <DateInput
              label="Deployed At"
              placeholder="YYYY-MM-DD"
              required
              {...form.getInputProps("deployed_at")}
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
                Delete Deployment
              </Button>
            )}
            <Group>
              <Button
                type="submit"
                color="teal"
                loading={isCreateMode ? createMutation.isLoading : updateMutation.isLoading}
                leftSection={<IconCheck size={16} />}
              >
                {isCreateMode ? "Create Deployment" : "Update Deployment"}
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
            dd
          </ConfirmationModal>
        )}
      </Paper>
    </Container>
  );
};

export default DeploymentDetailPage;
