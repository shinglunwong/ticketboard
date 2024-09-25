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
import {
  ticketPriorityOptions,
  ticketSortOptions,
  ticketStatusOptions,
  ticketTypeOptions,
} from "../../consts/options";

const TicketListPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Fetch tickets with projectId
  const { data: tickets, isLoading, isError } = useFetchTickets(projectId);

  const handleCreateTicket = () => {
    navigate(`/projects/${projectId}/tickets/create`);
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
          <Button variant="subtle" color="gray" onClick={() => navigate(`/projects/`)}>
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
            // label="Sort By"
            placeholder="Select sort option"
            clearable
            data={ticketSortOptions}
            value={sortOption}
            onChange={setSortOption}
            style={{ flex: 1 }}
          />
          <Select
            // label="Filter By Status"
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
                    color={getOptionColor(ticket.priority, ticketPriorityOptions)}
                    variant="light"
                  >
                    {`Priority ${ticket.priority}`}
                  </Badge>
                  <Badge color={getOptionColor(ticket.status, ticketStatusOptions)} variant="light">
                    {formatLabel(ticket.status, ticketStatusOptions)}
                  </Badge>
                  <Badge color="gray" variant="light">
                    {`${ticket.estimated_hours} hrs`}
                  </Badge>
                  <Badge color={getOptionColor(ticket.type, ticketTypeOptions)} variant="light">
                    {formatLabel(ticket.type, ticketTypeOptions)}
                  </Badge>
                </Group>
              </Group>
              {/* Title */}
              <Text weight={500} size="lg" mb="xs">
                {ticket.title}
              </Text>
              {/* Description */}
              <Text size="sm">{ticket.description}</Text>
              {/* Bottom Right: View Details Button */}
              <Group justify="flex-end" mt="md">
                <Button
                  variant="light"
                  color="blue"
                  size="sm"
                  onClick={() => navigate(`/projects/${projectId}/tickets/${ticket.id}`)}
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

const getOptionColor = (value, options) => {
  const option = options.find((opt) => opt.value.toString() === value.toString());
  return option ? option.color : "gray";
};
const formatLabel = (value, options) => {
  const option = options.find((opt) => opt.value.toString() === value.toString());
  return option ? option.label : value;
};

export default TicketListPage;
