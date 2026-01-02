import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  Select,
} from '../components';
import { useEvents } from '../context/events-context';

export default function AddEventDialog() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'On Sale' | 'Sold Out' | 'Cancelled'>(
    'On Sale',
  );

  const handleCancel = () => {
    navigate('/events');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({ name, date, time, location, status });
    navigate('/events');
  };

  return (
    <Dialog
      open={true}
      onClose={() => {
        // Prevent closing the dialog by clicking outside
      }}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogBody>
          <Fieldset>
            <FieldGroup>
              <Field>
                <Label>Event Name</Label>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter event name"
                />
              </Field>
              <Field>
                <Label>Date</Label>
                <Input
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label>Time</Label>
                <Input
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label>Location</Label>
                <Input
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="Enter event location"
                />
              </Field>
              <Field>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as 'On Sale' | 'Sold Out' | 'Cancelled',
                    )
                  }
                >
                  <option value="On Sale">On Sale</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </Field>
            </FieldGroup>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button type="button" plain onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Event</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
