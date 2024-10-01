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
import { IconArrowBack, IconPlus, IconEdit } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDeployments } from "./hooks";
import { deploymentPlatformOptions } from "../../consts/options";
import { getUserRole } from "../../utils/auth";

const DeploymentListPage = () => {
  const userRole = getUserRole();
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Fetch deployments with projectId
  const { data: deployments, isLoading, isError } = useFetchDeployments(projectId);

  const handleCreateDeployment = () => {
    navigate(`/projects/${projectId}/deployments/create`);
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
          Failed to load deployments.
        </Title>
      </Center>
    );
  }

  // Define table headers
  const headers = (
    <Table.Tr>
      <Table.Th>Deployed At</Table.Th>
      <Table.Th>Title</Table.Th>
      <Table.Th>Description</Table.Th>
      <Table.Th>Platform</Table.Th>
      {userRole === "admin" && <Table.Th>Actions</Table.Th>}
    </Table.Tr>
  );

  // Generate table rows
  const rows = deployments.map((deployment) => (
    <Table.Tr key={deployment.id}>
      <Table.Td>
        <Badge color="cyan" variant="light">
          {new Date(deployment.deployed_at).toLocaleDateString()}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text weight={500}>{deployment.title}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" color="dimmed">
          {deployment.description || "No description provided."}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge
          color={getOptionColor(deployment.platform, deploymentPlatformOptions)}
          variant="light"
        >
          {deployment.platform}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group spacing="xs">
          {userRole === "admin" && (
            <ActionIcon
              color="blue"
              variant="light"
              size="lg"
              onClick={() => navigate(`/projects/${projectId}/deployments/${deployment.id}`)}
              aria-label={`View deployment ${deployment.title}`}
            >
              <IconEdit size={16} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
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
          <Title order={2}>Deployments</Title>
        </Group>
        {userRole === "admin" && (
          <Button
            leftSection={<IconPlus size={16} />}
            color="teal"
            onClick={handleCreateDeployment}
          >
            Create
          </Button>
        )}
      </Group>

      {/* Deployments List */}
      {deployments.length === 0 ? (
        <Center style={{ height: "60vh" }}>
          <Text>No deployments found. Click "Create Deployment" to add a new one.</Text>
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

export default DeploymentListPage;
