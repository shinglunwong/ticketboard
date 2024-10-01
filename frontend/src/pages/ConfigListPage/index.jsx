import {
  Container,
  Paper,
  Title,
  Table,
  Button,
  Group,
  Loader,
  Center,
  ActionIcon,
} from "@mantine/core";
import { IconPlus, IconArrowBack, IconEdit } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useFetchConfigs } from "./hooks";

const ConfigListPage = () => {
  const navigate = useNavigate();

  const { data: configs, isLoading, isError } = useFetchConfigs();

  const handleAddConfig = () => {
    navigate("/configs/create");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleEdit = (id) => {
    navigate(`/configs/${id}`);
  };

  return (
    <Container size="lg" my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md" justify="space-between">
          <Group>
            <Button variant="subtle" color="gray" onClick={handleBack}>
              <IconArrowBack size={16} />
            </Button>
            <Title order={2}>Configs</Title>
          </Group>
          <Button leftSection={<IconPlus size={16} />} color="green" onClick={handleAddConfig}>
            Add Config
          </Button>
        </Group>

        {isLoading ? (
          <Center>
            <Loader size="lg" />
          </Center>
        ) : isError ? (
          <Center>
            <Title order={4} color="red">
              Failed to load configs.
            </Title>
          </Center>
        ) : (
          <Table highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Key</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {configs.length > 0 ? (
                configs.map((config) => (
                  <Table.Tr key={config.id}>
                    <Table.Td>{config.id}</Table.Td>
                    <Table.Td>{config.key}</Table.Td>
                    <Table.Td>{config.value}</Table.Td>
                    <Table.Td>
                      <ActionIcon color="blue" onClick={() => handleEdit(config.id)}>
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan="5">
                    <Center>No configs found.</Center>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default ConfigListPage;
