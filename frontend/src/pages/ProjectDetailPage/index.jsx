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
  Grid,
  Table,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { creditForm, projectForm } from "../../consts/forms";
import { useEffect, useState } from "react";
import {
  useDeleteProject,
  useFetchProject,
  useUpdateProject,
  useCreateProject,
  useCreateCredit,
} from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { projectStatusOptions } from "../../consts/options";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const isCreateMode = projectId === "create";

  // Fetch project data only if not in create mode
  const { data: projectData, isLoading, isError } = useFetchProject(projectId);
  // Initialize form
  const projectFormInstance = useForm(projectForm);
  const creditFormInstance = useForm(creditForm);

  // Define mutations
  const updateMutation = useUpdateProject(projectId);
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject(projectId);
  const createCreditMutation = useCreateCredit(projectId);

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

  const handleCreditSubmit = (values) => {
    createCreditMutation.mutate({ ...values, project_id: projectId });
    creditFormInstance.reset();
  };

  useEffect(() => {
    if (!isCreateMode && projectData?.project) {
      projectFormInstance.setValues(projectData.project);
    } else if (isCreateMode) {
      projectFormInstance.reset();
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
    <Container size="xl" my={40}>
      <Grid>
        {/* Project Details Section */}
        <Grid.Col span={8}>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group mb="md">
              <Button variant="subtle" color="gray" onClick={() => navigate("/projects")}>
                <IconArrowBack size={16} />
              </Button>
              <Title order={2}>{isCreateMode ? "Create Project" : "Project Details"}</Title>
            </Group>

            <form onSubmit={projectFormInstance.onSubmit(handleSubmit)}>
              <Stack spacing="sm">
                <TextInput
                  label="Responsible User Id"
                  required
                  {...projectFormInstance.getInputProps("user_id")}
                />
                <TextInput
                  label="Project Icon"
                  required
                  {...projectFormInstance.getInputProps("icon")}
                />
                <TextInput
                  label="Project Name"
                  required
                  {...projectFormInstance.getInputProps("name")}
                />
                <TextInput
                  label="Description"
                  required
                  {...projectFormInstance.getInputProps("description")}
                />
                <Select
                  label="Status"
                  placeholder="Select status"
                  data={projectStatusOptions}
                  required
                  {...projectFormInstance.getInputProps("status")}
                />
                <NumberInput
                  label="Credits"
                  required
                  min={0}
                  {...projectFormInstance.getInputProps("credits")}
                />
                <NumberInput
                  label="Max Accumulated Credits"
                  required
                  min={0}
                  {...projectFormInstance.getInputProps("max_accumulated_credits")}
                />
                <NumberInput
                  label="Max Credit Duration (hours)"
                  required
                  min={0}
                  {...projectFormInstance.getInputProps("max_credit_duration")}
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
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Title order={3} mb="md">
              Update Credit
            </Title>
            <form onSubmit={creditFormInstance.onSubmit(handleCreditSubmit)}>
              <Stack spacing="sm">
                <TextInput
                  label="Title"
                  placeholder="Credit Title"
                  required
                  {...creditFormInstance.getInputProps("title")}
                />
                <NumberInput
                  label="Amount"
                  placeholder="Enter amount"
                  required
                  {...creditFormInstance.getInputProps("amount")}
                />
              </Stack>

              <Group mt="xl" position="apart">
                <Button
                  type="submit"
                  color="blue"
                  loading={createCreditMutation.isLoading}
                  leftSection={<IconCheck size={16} />}
                >
                  Update Credit
                </Button>
              </Group>
            </form>
          </Paper>
          <Paper withBorder shadow="md" p={30} radius="md" mt={16}>
            <Title order={3} mb="md">
              Credit History
            </Title>
            {projectData && projectData.credits && projectData.credits.length > 0 ? (
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Td>Title</Table.Td>
                    <Table.Td>Amount</Table.Td>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {projectData.credits.map((credit) => (
                    <Table.Tr key={credit.id}>
                      <Table.Td>{credit.title}</Table.Td>
                      <Table.Td>{credit.amount}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Text color="dimmed">No credit history available.</Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProjectDetailPage;
