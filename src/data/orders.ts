// src/data/orders.ts
import { Provider } from "./providers";
import { ServiceSlug } from "./services";

export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  service: ServiceSlug;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  tracking: TrackingEvent[];
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type OrderStatus = 
  | "draft"
  | "pending"
  | "confirmed"
  | "in-progress"
  | "ready"
  | "completed"
  | "cancelled";

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  message: string;
  timestamp: string;
  location?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  province: string;
  credits: number;
  joinedAt: string;
}

const STATUS_ORDER = ['draft', 'pending', 'confirmed', 'in-progress', 'ready', 'completed', 'cancelled'];

const STATUS_MESSAGES: Record<OrderStatus, string[]> = {
  draft: ['Order created', 'Awaiting confirmation'],
  pending: ['Order submitted', 'Awaiting provider approval'],
  confirmed: ['Order confirmed', 'Production scheduled'],
  'in-progress': ['In production', 'Quality check in progress'],
  ready: ['Order ready', 'Awaiting collection/delivery'],
  completed: ['Order completed', 'Thank you for your business'],
  cancelled: ['Order cancelled', 'Refund processed']
};

const SERVICE_ITEMS: Record<ServiceSlug, Array<{ name: string; unitPrice: number; unit: string }>> = {
  'document-printing': [
    { name: 'Document Printing', unitPrice: 2.50, unit: 'page' },
    { name: 'Binding', unitPrice: 25.00, unit: 'book' },
    { name: 'Lamination', unitPrice: 15.00, unit: 'sheet' },
  ],
  'vehicle-branding': [
    { name: 'Full Vehicle Wrap', unitPrice: 3500, unit: 'vehicle' },
    { name: 'Partial Wrap', unitPrice: 1800, unit: 'vehicle' },
    { name: 'Window Graphics', unitPrice: 450, unit: 'window' },
  ],
  signage: [
    { name: 'Sign Board', unitPrice: 450, unit: 'm²' },
    { name: 'LED Sign', unitPrice: 1200, unit: 'unit' },
    { name: 'Banner', unitPrice: 250, unit: 'm²' },
  ],
  design: [
    { name: 'Logo Design', unitPrice: 1800, unit: 'project' },
    { name: 'Brand Package', unitPrice: 4500, unit: 'package' },
    { name: 'Print Layout', unitPrice: 900, unit: 'layout' },
  ],
  'large-format': [
    { name: 'Poster Printing', unitPrice: 350, unit: 'm²' },
    { name: 'Banner Stand', unitPrice: 850, unit: 'unit' },
  ],
  packaging: [
    { name: 'Custom Boxes', unitPrice: 120, unit: 'box' },
    { name: 'Labels', unitPrice: 45, unit: 'roll' },
  ]
};

function generateTrackingEvents(status: OrderStatus, createdAt: string): TrackingEvent[] {
  const events: TrackingEvent[] = [];
  const date = new Date(createdAt);
  const statusIndex = STATUS_ORDER.indexOf(status);

  for (let i = 0; i <= statusIndex; i++) {
    const currentStatus = STATUS_ORDER[i] as OrderStatus;
    const messages = STATUS_MESSAGES[currentStatus];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const timestamp = new Date(date.getTime() + i * (2 + Math.random() * 4) * 60 * 60 * 1000);
    
    events.push({
      id: `track-${Date.now()}-${i}`,
      status: currentStatus,
      message,
      timestamp: timestamp.toISOString(),
      location: Math.random() > 0.5 ? 'Pretoria' : 'Johannesburg',
    });
  }

  return events;
}

export function generateOrders(count: number = 500): Order[] {
  const orders: Order[] = [];
  const providers = Array.from({ length: 50 }, (_, i) => `prov-${i + 1}`);
  const customers = Array.from({ length: 100 }, (_, i) => `cust-${String(i + 1).padStart(3, '0')}`);
  const services = Object.keys(SERVICE_ITEMS) as ServiceSlug[];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const items = SERVICE_ITEMS[service];
    const numItems = 1 + Math.floor(Math.random() * Math.min(items.length, 3));
    const selectedItems = items.slice(0, numItems);
    
    const orderItems: OrderItem[] = selectedItems.map((item, idx) => {
      const quantity = 1 + Math.floor(Math.random() * 20);
      const unitPrice = item.unitPrice * (0.8 + Math.random() * 0.4);
      return {
        id: `item-${i}-${idx}`,
        name: item.name,
        description: `${item.name} (${item.unit})`,
        quantity,
        unitPrice: Math.round(unitPrice * 100) / 100,
        total: Math.round(unitPrice * quantity * 100) / 100,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const total = Math.round(subtotal * 100) / 100;

    const customerId = customers[Math.floor(Math.random() * customers.length)];
    const providerId = providers[Math.floor(Math.random() * providers.length)];
    
    const createdAt = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const statusIndex = Math.random() > 0.7 ? 5 : Math.floor(Math.random() * 6);
    const status = STATUS_ORDER[Math.min(statusIndex, STATUS_ORDER.length - 1)] as OrderStatus;
    
    const daysToAdd = [3, 5, 7, 10, 14];
    const deliveryDays = daysToAdd[Math.floor(Math.random() * daysToAdd.length)];
    const estimatedDelivery = new Date(createdAt.getTime() + deliveryDays * 24 * 60 * 60 * 1000);

    orders.push({
      id: `ord-${String(i + 1).padStart(4, '0')}`,
      customerId,
      providerId,
      service,
      status,
      items: orderItems,
      subtotal,
      total,
      createdAt: createdAt.toISOString(),
      updatedAt: new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      tracking: generateTrackingEvents(status, createdAt.toISOString()),
      deliveryAddress: `${Math.floor(Math.random() * 1000) + 1} ${['Main St', 'Church St', 'High St', 'Queen St', 'Kingsway', 'Oxford Ave', 'Jan Smuts Ave'][Math.floor(Math.random() * 7)]}, ${['Pretoria', 'Johannesburg', 'Cape Town', 'Durban', 'Bloemfontein'][Math.floor(Math.random() * 5)]}`,
      specialInstructions: Math.random() > 0.7 ? 'Please rush this order' : undefined,
    });
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Generate and export the orders
export const ORDERS = generateOrders(500);

// Helper functions
export function getOrdersByCustomer(customerId: string): Order[] {
  return ORDERS.filter(order => order.customerId === customerId);
}

export function getOrderById(orderId: string): Order | undefined {
  return ORDERS.find(order => order.id === orderId);
}