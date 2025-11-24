'use client';

import { Order, Driver } from '@/lib/types';
import { Package, User, Phone, MapPin, IndianRupee, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface OrdersTableProps {
  orders: Order[];
  drivers: Driver[];
  onAssignDriver: (orderId: string, driverId: string) => void;
}

export default function OrdersTable({ orders, drivers, onAssignDriver }: OrdersTableProps) {
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driver
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-sm text-gray-500">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    {order.customerName}
                  </div>
                  <div className="text-gray-500 flex items-center mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {order.customerPhone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs flex items-start">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{order.deliveryAddress}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    {order.amount.toLocaleString()}
                  </div>
                  {order.cashOnDelivery && (
                    <span className="text-xs text-orange-600 font-medium">COD</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.driverName || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {order.status === 'pending' && (
                  <select
                    onChange={(e) => onAssignDriver(order.id, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign Driver
                    </option>
                    {drivers
                      .filter((d) => d.status === 'active')
                      .map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
