// src/pages/DashboardPage/DashboardPage.jsx

import { Paper, Title, Container, Button, Stack, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

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
          <Button fullWidth variant="filled" color="green" onClick={() => navigate("/users")}>
            Users
          </Button>
        </Stack>
        <Divider mt={20} mb={20} />
        <Button fullWidth variant="light" color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
