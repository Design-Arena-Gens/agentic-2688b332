'use client';

import { Driver } from '@/lib/types';
import { Truck, Phone, Package, IndianRupee, CheckCircle, XCircle } from 'lucide-react';

interface DriversPanelProps {
  drivers: Driver[];
}

export default function DriversPanel({ drivers }: DriversPanelProps) {
  const getStatusColor = (status: Driver['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      'on-delivery': 'bg-blue-100 text-blue-800',
    };
    return colors[status];
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Phone className="h-3 w-3 mr-1" />
                  {driver.phone}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Vehicle: <span className="font-medium">{driver.vehicleNumber}</span>
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                driver.status
              )}`}
            >
              {driver.status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-3">
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400">
                <Package className="h-4 w-4 mr-1" />
              </div>
              <p className="text-lg font-semibold text-gray-900">{driver.assignedOrders}</p>
              <p className="text-xs text-gray-500">Orders</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400">
                <IndianRupee className="h-4 w-4 mr-1" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                ₹{driver.cashCollected.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Cash</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                {driver.cashVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {driver.cashVerified ? 'Verified' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
