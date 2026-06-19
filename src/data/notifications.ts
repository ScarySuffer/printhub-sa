export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'status' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #ord-0001 has been confirmed and is being processed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: '/orders/ord-0001',
  },
  {
    id: '2',
    type: 'status',
    title: 'Order In Progress',
    message: 'Your signage order #ord-0045 is now in production.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/orders/ord-0045',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: 'Your payment of R450.00 has been received for order #ord-0023.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    link: '/orders/ord-0023',
  },
  {
    id: '4',
    type: 'order',
    title: 'Order Ready',
    message: 'Your document printing order #ord-0012 is ready for collection.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    link: '/orders/ord-0012',
  },
  {
    id: '5',
    type: 'system',
    title: 'Welcome to PrintHub SA',
    message: 'Thank you for joining PrintHub SA! Start by exploring our services.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
];