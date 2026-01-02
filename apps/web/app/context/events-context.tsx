'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Event {
  id: number;
  name: string;
  url: string;
  date: string;
  time: string;
  location: string;
  totalRevenue: string;
  totalRevenueChange: string;
  ticketsAvailable: number;
  ticketsSold: number;
  ticketsSoldChange: string;
  pageViews: string;
  pageViewsChange: string;
  status: 'On Sale' | 'Sold Out' | 'Cancelled';
  imgUrl: string;
  thumbUrl: string;
}

type NewEventData = Pick<Event, 'name' | 'date' | 'time' | 'location' | 'status'>;

interface EventsContextType {
  events: Event[];
  addEvent: (event: NewEventData) => void;
}

const EventsContext = createContext<EventsContextType | null>(null);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

let nextId = 1;

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (eventData: NewEventData) => {
    const slug = slugify(eventData.name);
    const id = nextId++;
    const newEvent: Event = {
      ...eventData,
      id,
      url: `/events/${id}`,
      totalRevenue: '$0.00',
      totalRevenueChange: '+0%',
      ticketsAvailable: 100,
      ticketsSold: 0,
      ticketsSoldChange: '+0%',
      pageViews: '0',
      pageViewsChange: '+0%',
      imgUrl: `/events/${slug}.jpg`,
      thumbUrl: `/events/${slug}-thumb.jpg`,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
