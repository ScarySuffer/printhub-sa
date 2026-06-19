'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderCard } from '@/components/dashboard/OrderCard';
import { WalletCard } from '@/components/dashboard/WalletCard';
import { CUSTOMERS } from '@/data/customers';
import { getOrdersByCustomer, OrderStatus, Order } from '@/data/orders';
import { Search, Package, Clock, CheckCircle } from 'lucide-react';

// For demo, use first customer
const DEMO_CUSTOMER = CUSTOMERS[0];

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  
  const customerOrders = getOrdersByCustomer(DEMO_CUSTOMER.id);
  
  const filteredOrders = customerOrders.filter((order: Order) => {
    const matchesSearch = order.items.some((item: any) => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customerOrders.length,
    completed: customerOrders.filter((o: Order) => o.status === 'completed').length,
    inProgress: customerOrders.filter((o: Order) => o.status === 'in-progress' || o.status === 'confirmed').length,
    pending: customerOrders.filter((o: Order) => o.status === 'pending').length,
  };

  return (
    <main>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink dark:text-stock">
            Welcome back, {DEMO_CUSTOMER.name}
          </h1>
          <p className="text-board-600 dark:text-board-400 mt-1">
            {DEMO_CUSTOMER.company} · {DEMO_CUSTOMER.city}, {DEMO_CUSTOMER.province}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-board-600 dark:text-board-400">
              <Package className="h-4 w-4" />
              <span className="text-sm">Total Orders</span>
            </div>
            <p className="text-2xl font-bold text-ink dark:text-stock mt-1">{stats.total}</p>
          </div>
          
          <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
          </div>
          
          <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">In Progress</span>
            </div>
            <p className="text-2xl font-bold text-orange-500 mt-1">{stats.inProgress}</p>
          </div>
          
          <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-500 mt-1">{stats.pending}</p>
          </div>
        </div>

        {/* Wallet */}
        <div className="mb-8">
          <WalletCard credits={DEMO_CUSTOMER.credits} />
        </div>

        {/* Orders Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-ink dark:text-stock">
              Your Orders
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-board-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-800 text-ink dark:text-stock placeholder-board-400 focus:outline-none focus:ring-2 focus:ring-signal/50 w-full sm:w-48"
                />
              </div>
              
              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-800 text-ink dark:text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="space-y-3">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: Order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-board-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-ink dark:text-stock">No orders found</h3>
                <p className="text-board-600 dark:text-board-400 mt-1">
                  {searchTerm ? 'Try adjusting your search' : 'Start your first order today'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
