import { Outlet, useLocation } from 'react-router';
import { Button, Divider, Heading } from '../components';

export default function EventsLayout() {
  const { pathname } = useLocation();
  const isAddingEvent = pathname === '/events/new';

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Events</Heading>
        {!isAddingEvent && <Button href="/events/new">Add Event</Button>}
      </div>
      <Divider className="mt-4" />
      <Outlet />
    </>
  );
}
