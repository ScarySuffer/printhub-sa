'use client';

import { Order, OrderStatus } from '@/data/orders';
import { format } from 'date-fns';
import { ChevronRight, Clock, CheckCircle, Loader, XCircle, Package } from 'lucide-react';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
}

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  draft: <Clock className="h-4 w-4 text-gray-400" />,
  pending: <Loader className="h-4 w-4 text-yellow-500 animate-spin" />,
  confirmed: <CheckCircle className="h-4 w-4 text-blue-500" />,
  'in-progress': <Package className="h-4 w-4 text-orange-500" />,
  ready: <CheckCircle className="h-4 w-4 text-teal-500" />,
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  'in-progress': 'bg-orange-100 text-orange-700 border-orange-200',
  ready: 'bg-teal-100 text-teal-700 border-teal-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
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
      <div className="border border-stock-200 dark:border-ink-700 rounded-lg p-4 hover:border-signal transition-colors cursor-pointer bg-white dark:bg-ink-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm text-board-600 dark:text-board-400">
                {order.id}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusColor}`}>
                {STATUS_ICONS[order.status]}
                <span className="ml-1">{statusLabel}</span>
              </span>
            </div>
            <h4 className="font-medium text-ink dark:text-stock">
              {order.items.map(item => item.name).join(' + ')}
            </h4>
            <p className="text-sm text-board-600 dark:text-board-400 mt-1">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} · 
              {format(new Date(order.createdAt), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-ink dark:text-stock">
              R{order.total.toFixed(2)}
            </p>
            <p className="text-xs text-board-500 dark:text-board-400">
              {format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}