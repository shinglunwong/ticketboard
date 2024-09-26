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
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { projectForm } from "../../consts/forms";
import { useEffect, useState } from "react";
import { useDeleteProject, useFetchProject, useUpdateProject, useCreateProject } from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { projectStatusOptions } from "../../consts/options";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const isCreateMode = projectId === "create";

  // Fetch project data only if not in create mode
  const { data: projectData, isLoading, isError } = useFetchProject(projectId);

  // Initialize form
  const form = useForm(projectForm);

  // Define mutations
  const updateMutation = useUpdateProject(projectId);
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject(projectId);

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
    if (!isCreateMode && projectData?.project) {
      form.setValues(projectData.project);
    } else if (isCreateMode) {
      form.reset();
    }
  }, [projectData, isCreateMode]);

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
          Failed to load project.
        </Title>
      </Center>
    );
  }

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md">
          <Button variant="subtle" color="gray" onClick={() => navigate("/projects")}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create Project" : "Project Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <TextInput label="Responsible User Id" required {...form.getInputProps("user_id")} />
            <TextInput label="Project Icon" required {...form.getInputProps("icon")} />
            <TextInput label="Project Name" required {...form.getInputProps("name")} />
            <TextInput label="Description" required {...form.getInputProps("description")} />
            <Select
              label="Status"
              placeholder="Select status"
              data={projectStatusOptions}
              required
              {...form.getInputProps("status")}
            />
            <NumberInput label="Credits" required min={0} {...form.getInputProps("credits")} />
            <NumberInput
              label="Max Accumulated Credits"
              required
              min={0}
              {...form.getInputProps("max_accumulated_credits")}
            />
            <NumberInput
              label="Max Credit Duration (hours)"
              required
              min={0}
              {...form.getInputProps("max_credit_duration")}
            />
          </Stack>

          <>
            <Group justify="space-between" mt="xl">
              {!isCreateMode ? (
                <Button
                  color="red"
                  variant="outline"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => setDeleteModalOpened(true)}
                >
                  Delete Project
                </Button>
              ) : (
                <div></div>
              )}

              <Group>
                <Button
                  type="submit"
                  color="teal"
                  loading={isCreateMode ? createMutation.isLoading : updateMutation.isLoading}
                  leftSection={<IconCheck size={16} />}
                >
                  {isCreateMode ? "Create Project" : "Update Project"}
                </Button>
              </Group>
            </Group>
          </>
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

export default ProjectDetailPage;
