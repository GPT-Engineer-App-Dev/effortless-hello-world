import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents, useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { data: venues, error: venuesError, isLoading: venuesLoading } = useVenues();

  if (eventsLoading || venuesLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (eventsError || venuesError) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          {eventsError?.message || venuesError?.message}
        </Alert>
      </Container>
    );
  }

  const getVenueName = (venueId) => {
    const venue = venues.find((venue) => venue.id === venueId);
    return venue ? venue.name : "Unknown Venue";
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Events</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{new Date(event.date).toLocaleDateString()}</Td>
                <Td>{getVenueName(event.venue)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;