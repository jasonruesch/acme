import { useEvents } from '../context/events-context';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '../components';

export default function EventsIndex() {
  const { events } = useEvents();

  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <Text>No events yet. Click "Add Event" to create one.</Text>
      </div>
    );
  }

  return (
    <Table className="mt-8">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Time</TableHeader>
          <TableHeader>Location</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id} href={event.url}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
              <Badge
                color={
                  event.status === 'On Sale'
                    ? 'lime'
                    : event.status === 'Sold Out'
                      ? 'zinc'
                      : 'red'
                }
              >
                {event.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
