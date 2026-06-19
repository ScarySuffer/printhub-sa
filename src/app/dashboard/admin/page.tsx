'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ORDERS } from '@/data/orders';
import { PROVIDERS } from '@/data/providers';
import { CUSTOMERS } from '@/data/customers';
import { 
  Users, Building2, Package, 
  CheckCircle, DollarSign, Search
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'providers' | 'customers' | 'orders'>('overview');

  const stats = {
    totalProviders: PROVIDERS.length,
    verifiedProviders: PROVIDERS.filter(p => p.verified).length,
    totalCustomers: CUSTOMERS.length,
    totalOrders: ORDERS.length,
    completedOrders: ORDERS.filter(o => o.status === 'completed').length,
    totalRevenue: ORDERS
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0),
  };

  const pendingProviders = PROVIDERS.filter(p => !p.verified);
  const recentOrders = ORDERS.slice(0, 10);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <main>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stock">
              Admin Dashboard
            </h1>
            <p className="text-stock-dim mt-1">
              System overview and management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-stock-dim">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">Providers</span>
              </div>
              <p className="text-2xl font-bold text-stock mt-1">{stats.totalProviders}</p>
              <p className="text-xs text-confirmed mt-1">{stats.verifiedProviders} verified</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-stock-dim">
                <Users className="h-4 w-4" />
                <span className="text-sm">Customers</span>
              </div>
              <p className="text-2xl font-bold text-stock mt-1">{stats.totalCustomers}</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-stock-dim">
                <Package className="h-4 w-4" />
                <span className="text-sm">Orders</span>
              </div>
              <p className="text-2xl font-bold text-stock mt-1">{stats.totalOrders}</p>
              <p className="text-xs text-confirmed mt-1">{stats.completedOrders} completed</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-signal">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-signal mt-1">R{stats.totalRevenue.toFixed(0)}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-ink-line mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-signal text-stock'
                  : 'border-transparent text-stock-dim hover:text-stock'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'providers'
                  ? 'border-signal text-stock'
                  : 'border-transparent text-stock-dim hover:text-stock'
              }`}
            >
              Providers
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'customers'
                  ? 'border-signal text-stock'
                  : 'border-transparent text-stock-dim hover:text-stock'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'orders'
                  ? 'border-signal text-stock'
                  : 'border-transparent text-stock-dim hover:text-stock'
              }`}
            >
              Orders
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              {pendingProviders.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-stock mb-3">Pending Provider Approvals</h3>
                  <div className="space-y-2">
                    {pendingProviders.slice(0, 5).map(provider => (
                      <div key={provider.id} className="bg-ink-raised border border-ink-line rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-stock">{provider.name}</p>
                          <p className="text-sm text-stock-dim">
                            {provider.city}, {provider.province}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-confirmed text-ink rounded text-sm hover:opacity-80 transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-stock mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {recentOrders.map(order => (
                    <div key={order.id} className="bg-ink-raised border border-ink-line rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm text-stock-dim">
                            {order.id}
                          </span>
                          <span className={`ml-2 text-xs px-2 py-1 rounded-full border ${
                            order.status === 'completed' ? 'bg-confirmed/20 text-confirmed border-confirmed/30' :
                            order.status === 'in-progress' ? 'bg-signal/20 text-signal border-signal/30' :
                            'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                          }`}>
                            {order.status}
                          </span>
                          <p className="text-sm text-stock-dim mt-1">
                            {format(new Date(order.createdAt), 'dd MMM yyyy HH:mm')}
                          </p>
                        </div>
                        <p className="font-bold text-stock">
                          R{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ink-line">
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Services</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROVIDERS.slice(0, 20).map(provider => (
                      <tr key={provider.id} className="border-b border-ink-line last:border-0">
                        <td className="py-3 px-4 text-stock">{provider.name}</td>
                        <td className="py-3 px-4 text-stock-dim">{provider.city}</td>
                        <td className="py-3 px-4 text-stock-dim">
                          {provider.capabilities.slice(0, 2).join(', ')}
                          {provider.capabilities.length > 2 && '...'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${provider.verified ? 'bg-confirmed/20 text-confirmed' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {provider.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stock-dim">⭐ {provider.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ink-line">
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Company</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CUSTOMERS.slice(0, 20).map(customer => (
                      <tr key={customer.id} className="border-b border-ink-line last:border-0">
                        <td className="py-3 px-4 text-stock">{customer.name}</td>
                        <td className="py-3 px-4 text-stock-dim">{customer.email}</td>
                        <td className="py-3 px-4 text-stock-dim">{customer.company}</td>
                        <td className="py-3 px-4 text-signal font-medium">R{customer.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ink-line">
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-stock-dim">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.slice(0, 20).map(order => (
                      <tr key={order.id} className="border-b border-ink-line last:border-0">
                        <td className="py-3 px-4 font-mono text-sm text-stock-dim">{order.id}</td>
                        <td className="py-3 px-4 text-stock">{order.service}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'completed' ? 'bg-confirmed/20 text-confirmed' :
                            order.status === 'in-progress' ? 'bg-signal/20 text-signal' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-stock">R{order.total.toFixed(2)}</td>
                        <td className="py-3 px-4 text-stock-dim">
                          {format(new Date(order.createdAt), 'dd MMM yyyy')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}