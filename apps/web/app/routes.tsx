import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./app.tsx', [
    index('./routes/home.tsx'),
    route('events', './routes/events.tsx'),
    route('orders', './routes/orders.tsx'),
    route('settings', './routes/settings.tsx'),
  ]),
] satisfies RouteConfig;
