'use client';

import { CashCollection } from '@/lib/types';
import { IndianRupee, Package, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { format } from 'date-fns';

interface CashCollectionPanelProps {
  collections: CashCollection[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function CashCollectionPanel({
  collections,
  onApprove,
  onReject,
}: CashCollectionPanelProps) {
  const getStatusColor = (status: CashCollection['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const pendingCollections = collections.filter((c) => c.status === 'pending');
  const completedCollections = collections.filter((c) => c.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Pending Approvals */}
      {pendingCollections.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {pendingCollections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        {collection.driverName}
                      </h4>
                      <span className="text-sm text-gray-500">({collection.driverId})</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <IndianRupee className="h-4 w-4 mr-1" />
                          Amount
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{collection.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Package className="h-4 w-4 mr-1" />
                          Orders
                        </div>
                        <p className="text-xl font-bold text-gray-900">{collection.ordersCount}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Submitted
                        </div>
                        <p className="text-sm text-gray-700">
                          {format(new Date(collection.submittedAt), 'MMM dd, HH:mm')}
                        </p>
                      </div>
                    </div>
                    {collection.notes && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                        <strong>Notes:</strong> {collection.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => onApprove(collection.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(collection.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Collections */}
      {completedCollections.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Collections</h3>
          <div className="space-y-3">
            {completedCollections.map((collection) => (
              <div key={collection.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <h4 className="font-semibold text-gray-900">{collection.driverName}</h4>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          collection.status
                        )}`}
                      >
                        {collection.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm">
                      <div className="flex items-center text-gray-600">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        ₹{collection.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package className="h-4 w-4 mr-1" />
                        {collection.ordersCount} orders
                      </div>
                      {collection.verifiedAt && (
                        <div className="text-gray-500">
                          Verified {format(new Date(collection.verifiedAt), 'MMM dd, HH:mm')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {collections.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No cash collections found</p>
        </div>
      )}
    </div>
  );
}
