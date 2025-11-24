'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { mockDrivers, mockOrders, mockCashCollections } from '@/lib/mockData';
import dynamic from 'next/dynamic';
import StatsCards from '@/components/StatsCards';
import OrdersTable from '@/components/OrdersTable';
import DriversPanel from '@/components/DriversPanel';
import CashCollectionPanel from '@/components/CashCollectionPanel';
import { LayoutDashboard, Package, Truck, IndianRupee, Menu, X } from 'lucide-react';

const LiveMap = dynamic(() => import('@/components/LiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Dashboard() {
  const {
    drivers,
    orders,
    cashCollections,
    setDrivers,
    setOrders,
    setCashCollections,
    assignOrderToDriver,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'drivers' | 'cash'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setDrivers(mockDrivers);
    setOrders(mockOrders);
    setCashCollections(mockCashCollections);
  }, [setDrivers, setOrders, setCashCollections]);

  const handleAssignDriver = (orderId: string, driverId: string) => {
    assignOrderToDriver(orderId, driverId);
  };

  const handleApproveCash = (id: string) => {
    setCashCollections(
      cashCollections.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'approved' as const,
              verifiedAt: new Date().toISOString(),
              verifiedBy: 'Manager',
            }
          : c
      )
    );
  };

  const handleRejectCash = (id: string) => {
    setCashCollections(
      cashCollections.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'rejected' as const,
              verifiedAt: new Date().toISOString(),
              verifiedBy: 'Manager',
            }
          : c
      )
    );
  };

  const totalOrders = orders.length;
  const activeDrivers = drivers.filter((d) => d.status === 'active').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.amount, 0);
  const deliveredToday = orders.filter((o) => o.status === 'delivered').length;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'drivers', name: 'Drivers', icon: Truck },
    { id: 'cash', name: 'Cash Collection', icon: IndianRupee },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 lg:hidden"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Lekya Logistics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Logistics Manager</p>
                <p className="text-sm font-medium text-gray-900">Admin Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <nav className="mt-5 px-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors`}
              >
                <tab.icon
                  className={`${
                    activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
                  } mr-3 h-5 w-5`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <StatsCards
                totalOrders={totalOrders}
                activeDrivers={activeDrivers}
                totalRevenue={totalRevenue}
                deliveredToday={deliveredToday}
              />
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Driver Tracking</h2>
                <div className="h-[500px]">
                  <LiveMap drivers={drivers} />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{order.customerName}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Drivers</h2>
                  <DriversPanel drivers={drivers.slice(0, 3)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
              </div>
              <OrdersTable
                orders={orders}
                drivers={drivers}
                onAssignDriver={handleAssignDriver}
              />
            </div>
          )}

          {activeTab === 'drivers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Driver Management</h2>
                <DriversPanel drivers={drivers} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h2>
                <div className="h-[500px]">
                  <LiveMap drivers={drivers} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cash' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cash Collection Management</h2>
              <CashCollectionPanel
                collections={cashCollections}
                onApprove={handleApproveCash}
                onReject={handleRejectCash}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
