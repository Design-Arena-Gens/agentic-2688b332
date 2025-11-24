import { create } from 'zustand';
import { Driver, Order, CashCollection } from './types';

interface AppState {
  drivers: Driver[];
  orders: Order[];
  cashCollections: CashCollection[];
  selectedDriver: Driver | null;
  selectedOrder: Order | null;
  setDrivers: (drivers: Driver[]) => void;
  setOrders: (orders: Order[]) => void;
  setCashCollections: (collections: CashCollection[]) => void;
  setSelectedDriver: (driver: Driver | null) => void;
  setSelectedOrder: (order: Order | null) => void;
  updateDriverLocation: (driverId: string, lat: number, lng: number) => void;
  assignOrderToDriver: (orderId: string, driverId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<AppState>((set) => ({
  drivers: [],
  orders: [],
  cashCollections: [],
  selectedDriver: null,
  selectedOrder: null,
  setDrivers: (drivers) => set({ drivers }),
  setOrders: (orders) => set({ orders }),
  setCashCollections: (collections) => set({ cashCollections: collections }),
  setSelectedDriver: (driver) => set({ selectedDriver: driver }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  updateDriverLocation: (driverId, lat, lng) =>
    set((state) => ({
      drivers: state.drivers.map((d) =>
        d.id === driverId
          ? {
              ...d,
              currentLocation: { lat, lng, timestamp: Date.now() },
            }
          : d
      ),
    })),
  assignOrderToDriver: (orderId, driverId) =>
    set((state) => {
      const driver = state.drivers.find((d) => d.id === driverId);
      return {
        orders: state.orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                assignedDriver: driverId,
                driverName: driver?.name,
                status: 'assigned' as const,
              }
            : o
        ),
      };
    }),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      ),
    })),
}));
