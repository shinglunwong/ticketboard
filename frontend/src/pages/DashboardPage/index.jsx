import { Paper, Title, Container, Button, Stack, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const userRole = getUserRole();

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="md">
          Dashboard
        </Title>
        <Stack spacing="md">
          <Button fullWidth variant="filled" color="blue" onClick={() => navigate("/projects")}>
            Projects
          </Button>
          {userRole === "admin" && (
            <Button fullWidth variant="filled" color="green" onClick={() => navigate("/users")}>
              Users
            </Button>
          )}
          {userRole === "admin" && (
            <Button fullWidth variant="filled" color="grey" onClick={() => navigate("/configs")}>
              Configs
            </Button>
          )}
        </Stack>
        <Divider my={20} />
        <Button fullWidth variant="light" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
