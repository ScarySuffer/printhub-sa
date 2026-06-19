'use client';

import { Order, TrackingEvent, OrderStatus } from '@/data/orders';
import { CheckCircle, Clock, Loader, XCircle, Package, Check, Circle } from 'lucide-react';
import { format } from 'date-fns';

interface TrackingTimelineProps {
  order: Order;
}

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  draft: <Circle className="h-5 w-5 text-gray-400" />,
  pending: <Loader className="h-5 w-5 text-yellow-500 animate-spin" />,
  confirmed: <CheckCircle className="h-5 w-5 text-blue-500" />,
  'in-progress': <Package className="h-5 w-5 text-orange-500" />,
  ready: <CheckCircle className="h-5 w-5 text-teal-500" />,
  completed: <Check className="h-5 w-5 text-green-500" />,
  cancelled: <XCircle className="h-5 w-5 text-red-500" />,
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

export function TrackingTimeline({ order }: TrackingTimelineProps) {
  const events = order.tracking;

  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-stock-300 dark:bg-ink-700" />
      
      <div className="space-y-6">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          const isCompleted = event.status === 'completed';
          
          return (
            <div key={event.id} className="relative flex gap-4">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-ink-800 border-2 border-stock-300 dark:border-ink-700">
                {STATUS_ICONS[event.status]}
              </div>
              
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-ink dark:text-stock">
                    {STATUS_LABELS[event.status]}
                  </h4>
                  <span className="text-sm text-board-600 dark:text-board-400">
                    {format(new Date(event.timestamp), 'dd MMM yyyy, HH:mm')}
                  </span>
                </div>
                
                <p className="text-sm text-board-600 dark:text-board-400 mt-1">
                  {event.message}
                </p>
                
                {event.location && (
                  <p className="text-xs text-board-500 dark:text-board-500 mt-1">
                    📍 {event.location}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}