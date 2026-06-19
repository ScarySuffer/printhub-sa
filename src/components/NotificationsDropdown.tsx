'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bell, Check, X, Clock, Package, CreditCard, AlertCircle } from 'lucide-react';
import { NOTIFICATIONS, Notification } from '@/data/notifications';
import { format } from 'date-fns';

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <Package className="h-4 w-4 text-blue-500" />;
      case 'payment': return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'status': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'system': return <AlertCircle className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-stock-dim hover:text-stock transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-signal rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-stock-200 dark:border-ink-700">
            <h3 className="font-semibold text-ink dark:text-stock">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-signal hover:text-signal/80 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-stock-100 dark:divide-ink-700">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-stock-50 dark:hover:bg-ink-700 transition-colors ${
                    !notification.read ? 'bg-stock-50 dark:bg-ink-700/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm text-ink dark:text-stock truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="shrink-0 text-board-400 hover:text-signal transition-colors"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-board-600 dark:text-board-400 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-board-500 dark:text-board-500">
                          {format(new Date(notification.timestamp), 'dd MMM yyyy, HH:mm')}
                        </span>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            onClick={() => {
                              markAsRead(notification.id);
                              setIsOpen(false);
                            }}
                            className="text-xs text-signal hover:text-signal/80 transition-colors"
                          >
                            View →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-board-400 mx-auto mb-2" />
                <p className="text-board-600 dark:text-board-400">No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}