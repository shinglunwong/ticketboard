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
import { IconArrowBack, IconPlus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchTickets } from "./hooks";
import { useState, useEffect } from "react";
import { ticketFilterOptions, ticketSortOptions, ticketStatusOptions } from "../../consts/options";

const TicketListPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Fetch tickets with projectId
  const { data: tickets, isLoading, isError } = useFetchTickets(projectId);

  const handleCreateTicket = () => {
    navigate("/tickets/create");
  };

  // State for sorting and filtering
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // State for sorted and filtered tickets
  const [displayTickets, setDisplayTickets] = useState([]);

  useEffect(() => {
    if (tickets) {
      let filtered = [...tickets];

      // Apply filtering
      if (filterOption) {
        filtered = filtered.filter((ticket) => ticket.status === filterOption);
      }

      // Apply sorting
      if (sortOption) {
        filtered.sort((a, b) => {
          if (sortOption === "priority") {
            return a.priority - b.priority;
          } else if (sortOption === "estimated_hours") {
            return a.estimated_hours - b.estimated_hours;
          } else if (sortOption === "type") {
            return a.type.localeCompare(b.type);
          } else {
            return 0;
          }
        });
      }

      setDisplayTickets(filtered);
    }
  }, [tickets, sortOption, filterOption]);

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
          Failed to load tickets.
        </Title>
      </Center>
    );
  }

  return (
    <Container size="xl" my={40}>
      <Group mb="md" justify="space-between">
        <Group>
          <Button variant="subtle" color="gray" onClick={() => navigate(-1)}>
            <IconArrowBack size={16} />
          </Button>
          <Title order={2}>Tickets</Title>
        </Group>
        <Button leftSection={<IconPlus size={16} />} color="teal" onClick={handleCreateTicket}>
          Create Ticket
        </Button>
      </Group>

      <Stack spacing="md" mb="lg">
        <Group spacing="md">
          <Select
            label="Sort By"
            placeholder="Select sort option"
            clearable
            data={ticketSortOptions}
            value={sortOption}
            onChange={setSortOption}
            style={{ flex: 1 }}
          />
          <Select
            label="Filter By Status"
            placeholder="Select status"
            clearable
            data={ticketStatusOptions}
            value={filterOption}
            onChange={setFilterOption}
            style={{ flex: 1 }}
          />
        </Group>
      </Stack>

      {displayTickets.length === 0 ? (
        <Center style={{ height: "60vh" }}>
          <Text>No tickets found. Click "Create Ticket" to add a new one.</Text>
        </Center>
      ) : (
        <SimpleGrid cols={1} spacing="lg">
          {displayTickets.map((ticket) => (
            <Card key={ticket.id} shadow="sm" padding="lg" radius="md" withBorder>
              {/* Top row: Priority, Status, Estimated Hours, Type */}
              <Group position="apart" mb="sm">
                <Group spacing="xs">
                  <Badge
                    color={getPriorityColor(ticket.priority)}
                  >{`Priority ${ticket.priority}`}</Badge>
                  <Badge color={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                  <Badge color="gray">{`${ticket.estimated_hours} hrs`}</Badge>
                  <Badge color="blue">{ticket.type}</Badge>
                </Group>
              </Group>
              {/* Title */}
              <Text weight={500} size="lg" mb="xs">
                {ticket.title}
              </Text>
              {/* Description */}
              <Text size="sm" color="dimmed">
                {ticket.description}
              </Text>
              {/* Bottom Right: View Details Button */}
              <Group position="right" mt="md">
                <Button
                  variant="light"
                  color="blue"
                  size="sm"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  View Details
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
    case "open":
      return "green";
    case "in progress":
      return "blue";
    case "closed":
      return "gray";
    default:
      return "dark";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    default:
      return "gray";
  }
};

export default TicketListPage;
