// src/pages/LoginPage/LoginPage.jsx

import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Paper, Title, Container, Button, Group } from "@mantine/core";
import { IconLogin } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../consts/forms";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm(loginForm);

  const mutation = useMutation({
    mutationFn: (values) => axios.post("/auth/login", values),
    onSuccess: ({ data }) => {
      // Handle successful login (e.g., store token, redirect)
      const { user, token } = data;
      localStorage.setItem("token", token);
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/tickets");
      }
    },
    onError: (err) => {
      notifications.show({
        title: err.response?.data?.message || err.message,
        color: "red",
        position: "bottom-center",
      });
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome Back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Group mt="lg" justify="center">
            <Button
              type="submit"
              leftSection={<IconLogin size={16} />}
              loading={mutation.isLoading}
            >
              Login
            </Button>
          </Group>
        </form>
        {/* <Divider label="Or continue with" labelPosition="center" my="lg" /> */}
      </Paper>
    </Container>
  );
};

export default LoginPage;
