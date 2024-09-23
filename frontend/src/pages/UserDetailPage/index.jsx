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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBack, IconCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { userForm } from "../../consts/forms";
import { useEffect, useState } from "react";
import { useCreateUser, useDeleteUser, useFetchUser, useUpdateUser } from "./hooks";
import ConfirmationModal from "../../components/ConfirmationModal";
import { userRoleOptions } from "../../consts/options";

const UserDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = id === "create";

  // Fetch user data
  const { data: userData, isLoading, isError } = useFetchUser(id);

  // Initialize form
  const form = useForm(userForm);

  // Mutations
  const updateMutation = useUpdateUser(id);
  const deleteMutation = useDeleteUser(id);
  const createMutation = useCreateUser();

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
    if (!isCreateMode && userData?.user) {
      form.setValues(userData.user);
    } else if (isCreateMode) {
      form.reset();
    }
  }, [userData, isCreateMode]);

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
          Failed to load user.
        </Title>
      </Center>
    );
  }

  return (
    <Container size={600} my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group mb="md">
          <Button variant="subtle" color="gray" onClick={() => navigate("/users")}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>{isCreateMode ? "Create User" : "User Details"}</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="sm">
            <TextInput label="Username" required {...form.getInputProps("username")} />
            <TextInput label="Email" required {...form.getInputProps("email")} />
            <TextInput label="Phone" required {...form.getInputProps("phone")} />
            <Select
              label="Role"
              placeholder="Select role"
              data={userRoleOptions}
              required
              {...form.getInputProps("role")}
            />

            {!isCreateMode && <Divider label="Change Password below" mt="md" />}
            <PasswordInput label="Password" {...form.getInputProps("password")} />
          </Stack>

          <Group justify="space-between" mt="xl">
            {!isCreateMode ? (
              <Button
                color="red"
                variant="outline"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteModalOpened(true)}
              >
                Delete User
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
              {isCreateMode ? "Create User" : "Update User"}
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

export default UserDetailPage;
