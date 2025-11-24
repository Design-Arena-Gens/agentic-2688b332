export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  status: 'active' | 'inactive' | 'on-delivery';
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: number;
  };
  assignedOrders: number;
  cashCollected: number;
  cashVerified: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  pickupAddress: string;
  amount: number;
  cashOnDelivery: boolean;
  status: 'pending' | 'assigned' | 'picked-up' | 'in-transit' | 'delivered' | 'returned';
  assignedDriver?: string;
  driverName?: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  notes?: string;
}

export interface CashCollection {
  id: string;
  driverId: string;
  driverName: string;
  amount: number;
  ordersCount: number;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface LocationUpdate {
  driverId: string;
  lat: number;
  lng: number;
  timestamp: number;
}
