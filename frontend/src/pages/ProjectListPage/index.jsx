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
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
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
                  {project.title}
                </Avatar>
                <div>
                  <Text weight={500} size="lg">
                    {project.title}
                  </Text>
                  <Text size="sm">{project.description}</Text>
                </div>
              </Group>
              <Badge color={getStatusColor(project.status)} variant="light" mt="md">
                {project.status}
              </Badge>
              <Group mt="md" justify="space-between">
                {userRole === "admin" ? (
                  <Button
                    variant="light"
                    color="blue"
                    size="sm"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View Details
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
                  variant="light"
                  color="blue"
                  size="sm"
                  onClick={() => navigate(`/projects/${project.id}/tickets`)}
                >
                  Tickets
                </Button>
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
