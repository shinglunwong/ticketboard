import {
  Container,
  Title,
  Button,
  Group,
  SimpleGrid,
  Card,
  Text,
  Badge,
  Loader,
  Center,
  Select,
  Stack,
} from "@mantine/core";
import { IconArrowBack, IconPlus, IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDeployments } from "./hooks";
import { useState, useEffect } from "react";
import { deploymentPlatformOptions, deploymentSortOptions } from "../../consts/options";
import ConfirmationModal from "../../components/ConfirmationModal"; // Ensure this component exists
import { notifications } from "@mantine/notifications";

const DeploymentListPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Fetch deployments with projectId
  const { data: deployments, isLoading, isError } = useFetchDeployments(projectId);

  const handleCreateDeployment = () => {
    navigate(`/projects/${projectId}/deployments/create`);
  };

  // State for sorting and filtering
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // State for sorted and filtered deployments
  const [displayDeployments, setDisplayDeployments] = useState([]);

  useEffect(() => {
    if (deployments) {
      let filtered = [...deployments];

      // Apply filtering
      if (filterOption) {
        filtered = filtered.filter((deployment) => deployment.platform === filterOption);
      }

      // Apply sorting
      if (sortOption) {
        if (sortOption === "deployed_at_desc") {
          filtered.sort((a, b) => new Date(b.deployed_at) - new Date(a.deployed_at));
        } else if (sortOption === "deployed_at_asc") {
          filtered.sort((a, b) => new Date(a.deployed_at) - new Date(b.deployed_at));
        } else if (sortOption === "platform") {
          filtered.sort((a, b) => a.platform.localeCompare(b.platform));
        }
      }

      setDisplayDeployments(filtered);
    }
  }, [deployments, sortOption, filterOption]);

  // Handler for delete action
  const handleDelete = (deployment) => {
    setDeploymentToDelete(deployment);
    setDeleteModalOpened(true);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeploymentToDelete(null);
    setDeleteModalOpened(false);
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

  return (
    <Container size="xl" my={40}>
      {/* Header Section */}
      <Group mb="md" justify="space-between">
        <Group>
          <Button variant="subtle" color="gray" onClick={() => navigate(`/projects/${projectId}`)}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>Deployments</Title>
        </Group>
        <Button leftSection={<IconPlus size={16} />} color="teal" onClick={handleCreateDeployment}>
          Create Deployment
        </Button>
      </Group>
      {/* Filter and Sort Section */}
      <Stack spacing="md" mb="lg">
        <Group spacing="md">
          <Select
            placeholder="Sort by"
            clearable
            data={deploymentSortOptions}
            value={sortOption}
            onChange={setSortOption}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by Platform"
            clearable
            data={deploymentPlatformOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            value={filterOption}
            onChange={setFilterOption}
            style={{ flex: 1 }}
          />
        </Group>
      </Stack>
      {/* Deployments List */}
      {displayDeployments.length === 0 ? (
        <Center style={{ height: "60vh" }}>
          <Text>No deployments found. Click "Create Deployment" to add a new one.</Text>
        </Center>
      ) : (
        <SimpleGrid cols={1} spacing="lg">
          {displayDeployments.map((deployment) => (
            <Card key={deployment.id} shadow="sm" padding="lg" radius="md" withBorder>
              {/* Top Row: Platform and Deployed At */}
              <Group position="apart" mb="sm">
                <Badge
                  color={getOptionColor(deployment.platform, deploymentPlatformOptions)}
                  variant="light"
                >
                  {deployment.platform}
                </Badge>
                <Badge color="cyan" variant="light">
                  {new Date(deployment.deployed_at).toLocaleDateString()}
                </Badge>
              </Group>

              {/* Title */}
              <Text weight={500} size="lg" mb="xs">
                {deployment.title}
              </Text>

              {/* Description */}
              <Text size="sm" color="dimmed">
                {deployment.description || "No description provided."}
              </Text>

              {/* Action Buttons */}
              <Group position="apart" mt="md">
                <Group spacing="xs">
                  <Button
                    variant="light"
                    color="blue"
                    size="sm"
                    leftSection={<IconEye size={16} />}
                    onClick={() => navigate(`/projects/${projectId}/deployments/${deployment.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="light"
                    color="yellow"
                    size="sm"
                    leftSection={<IconEdit size={16} />}
                    onClick={() =>
                      navigate(`/projects/${projectId}/deployments/${deployment.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
                    color="red"
                    size="sm"
                    leftSection={<IconTrash size={16} />}
                    onClick={() => handleDelete(deployment)}
                  >
                    Delete
                  </Button>
                </Group>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

// Helper Functions
const getOptionColor = (value, options) => {
  const option = options.find((opt) => opt.value.toString() === value.toString());
  return option ? option.color : "gray";
};

const formatLabel = (value, options) => {
  const option = options.find((opt) => opt.value.toString() === value.toString());
  return option ? option.label : value;
};

export default DeploymentListPage;
