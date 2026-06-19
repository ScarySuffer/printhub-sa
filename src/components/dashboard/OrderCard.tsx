'use client';

import { Order, OrderStatus } from '@/data/orders';
import { format } from 'date-fns';
import { ChevronRight, Clock, CheckCircle, Loader, XCircle, Package } from 'lucide-react';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
}

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  draft: <Clock className="h-4 w-4 text-stock-dim" />,
  pending: <Loader className="h-4 w-4 text-yellow-500 animate-spin" />,
  confirmed: <CheckCircle className="h-4 w-4 text-blue-500" />,
  'in-progress': <Package className="h-4 w-4 text-signal" />,
  ready: <CheckCircle className="h-4 w-4 text-confirmed" />,
  completed: <CheckCircle className="h-4 w-4 text-confirmed" />,
  cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  draft: 'bg-ink-raised text-stock-dim border-ink-line',
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  confirmed: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  'in-progress': 'bg-signal/20 text-signal border-signal/30',
  ready: 'bg-confirmed/20 text-confirmed border-confirmed/30',
  completed: 'bg-confirmed/20 text-confirmed border-confirmed/30',
  cancelled: 'bg-red-500/20 text-red-500 border-red-500/30',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  draft: 'Draft',
  pending: 'Pending Review',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  ready: 'Ready for Collection',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export function OrderCard({ order }: OrderCardProps) {
  const statusColor = STATUS_COLORS[order.status];
  const statusLabel = STATUS_LABELS[order.status];

  return (
    <Link href={`/orders/${order.id}`}>
      <div className="border border-ink-line bg-ink-raised rounded-lg p-4 hover:border-signal transition-colors cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm text-stock-dim">
                {order.id}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusColor}`}>
                {STATUS_ICONS[order.status]}
                <span className="ml-1">{statusLabel}</span>
              </span>
            </div>
            <h4 className="font-medium text-stock">
              {order.items.map(item => item.name).join(' + ')}
            </h4>
            <p className="text-sm text-stock-dim mt-1">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} · 
              {format(new Date(order.createdAt), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-stock">
              R{order.total.toFixed(2)}
            </p>
            <p className="text-xs text-stock-dim">
              {format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}