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
import { useFetchUsers } from "./hooks";

const UserListPage = () => {
  const navigate = useNavigate();

  const { data: users, isLoading, isError } = useFetchUsers();

  const handleAddUser = () => {
    navigate("/users/create");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <Container size="lg" my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md" justify="space-between">
          <Group>
            <Button variant="subtle" color="gray" onClick={handleBack}>
              <IconArrowBack size={16} />
            </Button>
            <Title order={2}>Users</Title>
          </Group>
          <Button leftSection={<IconPlus size={16} />} color="green" onClick={handleAddUser}>
            Add User
          </Button>
        </Group>

        {isLoading ? (
          <Center>
            <Loader size="lg" />
          </Center>
        ) : isError ? (
          <Center>
            <Title order={4} color="red">
              Failed to load users.
            </Title>
          </Center>
        ) : (
          <Table highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.id}</Table.Td>
                    <Table.Td>{user.username}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.phone}</Table.Td>
                    <Table.Td>
                      <ActionIcon color="blue" onClick={() => handleEdit(user.id)}>
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan="5">
                    <Center>No users found.</Center>
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

export default UserListPage;
