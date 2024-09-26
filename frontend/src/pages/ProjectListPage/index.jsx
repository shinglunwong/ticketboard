import {
  Container,
  Title,
  Button,
  Group,
  SimpleGrid,
  Card,
  Text,
  Badge,
  Avatar,
  Loader,
  Center,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowBack,
  IconClipboardList,
  IconCloudUpload,
  IconCreditCard,
  IconEdit,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "./hooks";
import { getUserRole } from "../../utils/auth";

const ProjectListPage = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  // Fetch projects
  const { data: projects, isLoading, isError } = useFetchProjects();

  // Handle navigation to create project page
  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const handleBack = () => {
    navigate("/dashboard");
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
          Failed to load projects.
        </Title>
      </Center>
    );
  }

  return (
    <Container size="xl" my={40}>
      <Group mb="md" justify="space-between">
        <Group>
          <Button variant="subtle" color="gray" onClick={handleBack}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>Projects</Title>
        </Group>
        {userRole === "admin" && (
          <Button onClick={handleCreateProject} color="teal">
            Create Project
          </Button>
        )}
      </Group>

      {projects.length === 0 ? (
        <Center style={{ height: "60vh" }}>
          <Text>No projects found. Click `&quot;`Create Project`&quot;` to add a new one.</Text>
        </Center>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {projects.map((project) => (
            <Card key={project.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Avatar color="blue" radius="xl">
                  <Text size="24">{project.icon}</Text>
                </Avatar>
                <div>
                  <Text weight={500} size="lg">
                    {project.name}
                  </Text>
                  <Text size="sm">{project.description}</Text>
                </div>
              </Group>
              <Badge color={getStatusColor(project.status)} variant="light" mt="md">
                {project.status}
              </Badge>
              <Group mt="md" justify="flex-end">
                {userRole === "admin" ? (
                  <Tooltip label="Edit" position="top" withArrow>
                    <ActionIcon
                      color="grey"
                      variant="light"
                      size="lg"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <IconEdit size={20} />
                    </ActionIcon>
                  </Tooltip>
                ) : (
                  <div></div>
                )}
                <Tooltip label="Deployments" position="top" withArrow>
                  <ActionIcon
                    color="teal"
                    variant="light"
                    size="lg"
                    onClick={() => navigate(`/projects/${project.id}/deployments`)}
                  >
                    <IconCloudUpload size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Payments" position="top" withArrow>
                  <ActionIcon
                    color="yellow"
                    variant="light"
                    size="lg"
                    onClick={() => navigate(`/projects/${project.id}/payments`)}
                  >
                    <IconCreditCard size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Tickets" position="top" withArrow>
                  <ActionIcon
                    color="blue"
                    variant="light"
                    size="lg"
                    onClick={() => navigate(`/projects/${project.id}/tickets`)}
                  >
                    <IconClipboardList size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "green";
    case "pending":
      return "yellow";
    case "completed":
      return "blue";
    case "archived":
      return "gray";
    default:
      return "dark";
  }
};

export default ProjectListPage;
