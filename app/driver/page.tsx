'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/lib/types';
import { mockOrders } from '@/lib/mockData';
import {
  Package,
  User,
  Phone,
  MapPin,
  IndianRupee,
  CheckCircle,
  XCircle,
  Camera,
  Navigation,
} from 'lucide-react';
import { format } from 'date-fns';

export default function DriverApp() {
  const [selectedDriver] = useState('D001'); // Simulating logged-in driver
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');

  useEffect(() => {
    // Filter orders for this driver
    const driverOrders = mockOrders.filter(
      (o) => o.assignedDriver === selectedDriver && o.status !== 'delivered'
    );
    setMyOrders(driverOrders);
  }, [selectedDriver]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setMyOrders(
      myOrders.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      'picked-up': 'bg-purple-100 text-purple-800',
      'in-transit': 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      returned: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getNextAction = (status: Order['status']) => {
    switch (status) {
      case 'assigned':
        return { action: 'picked-up', label: 'Mark as Picked Up', color: 'bg-purple-600' };
      case 'picked-up':
        return { action: 'in-transit', label: 'Start Delivery', color: 'bg-indigo-600' };
      case 'in-transit':
        return { action: 'delivered', label: 'Mark as Delivered', color: 'bg-green-600' };
      default:
        return null;
    }
  };

  const handleBarcodeSimulation = () => {
    const simulatedBarcode = selectedOrder?.barcode || '1234567890123';
    setScannedBarcode(simulatedBarcode);
    setScannerActive(false);
    alert(`Barcode scanned: ${simulatedBarcode}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Driver App</h1>
              <p className="text-primary-100 text-sm">ID: {selectedDriver}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-primary-500 rounded-lg hover:bg-primary-700 transition-colors">
                <Navigation className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {!selectedOrder ? (
        // Order List View
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-gray-600 text-sm mt-1">{myOrders.length} active orders</p>
          </div>

          <div className="space-y-4">
            {myOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-start text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{order.customerName}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 line-clamp-2">{order.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <IndianRupee className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-900 font-semibold">
                      ₹{order.amount.toLocaleString()}
                    </span>
                    {order.cashOnDelivery && (
                      <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        COD
                      </span>
                    )}
                  </div>
                </div>

                {getNextAction(order.status) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = getNextAction(order.status);
                      if (next) updateOrderStatus(order.id, next.action as Order['status']);
                    }}
                    className={`w-full ${
                      getNextAction(order.status)?.color
                    } text-white py-2 rounded-lg hover:opacity-90 transition-opacity font-medium`}
                  >
                    {getNextAction(order.status)?.label}
                  </button>
                )}
              </div>
            ))}

            {myOrders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">No orders assigned</p>
                <p className="text-gray-400 text-sm mt-2">Check back later for new deliveries</p>
              </div>
            )}
          </div>
        </main>
      ) : (
        // Order Detail View
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="mb-4 text-primary-600 font-medium hover:text-primary-700"
          >
            ← Back to Orders
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary-50 p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.orderNumber}</h2>
                  <p className="text-gray-600 mt-1">
                    Created {format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="text-gray-900">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-400" />
                    <a
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {selectedOrder.customerPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Addresses</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Pickup Address</p>
                    <p className="text-sm text-blue-700">{selectedOrder.pickupAddress}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-1">Delivery Address</p>
                    <p className="text-sm text-green-700">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-2xl font-bold text-gray-900 flex items-center">
                      <IndianRupee className="h-6 w-6" />
                      {selectedOrder.amount.toLocaleString()}
                    </span>
                  </div>
                  {selectedOrder.cashOnDelivery && (
                    <div className="mt-2 px-3 py-2 bg-orange-100 text-orange-800 rounded-lg text-center font-medium">
                      Cash on Delivery - Collect Payment
                    </div>
                  )}
                </div>
              </div>

              {/* Barcode Scanner */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Barcode</h3>
                {scannerActive ? (
                  <div className="p-6 bg-gray-900 rounded-lg text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-white" />
                    <p className="text-white mb-4">Camera Scanner Active</p>
                    <button
                      onClick={handleBarcodeSimulation}
                      className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium"
                    >
                      Simulate Scan
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setScannerActive(true)}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Scan Barcode
                    </button>
                    {scannedBarcode && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-sm text-green-800">
                          Scanned: <span className="font-mono font-bold">{scannedBarcode}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                {getNextAction(selectedOrder.status) && (
                  <button
                    onClick={() => {
                      const next = getNextAction(selectedOrder.status);
                      if (next) {
                        updateOrderStatus(selectedOrder.id, next.action as Order['status']);
                      }
                    }}
                    className={`w-full ${
                      getNextAction(selectedOrder.status)?.color
                    } text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg flex items-center justify-center`}
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {getNextAction(selectedOrder.status)?.label}
                  </button>
                )}
                {selectedOrder.status === 'in-transit' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'returned')}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Mark as Returned
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
