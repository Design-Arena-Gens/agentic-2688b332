import { NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder = {
    id: `ORD${String(mockOrders.length + 1).padStart(3, '0')}`,
    orderNumber: `LK-2024-${String(mockOrders.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending' as const,
    ...body,
  };
  mockOrders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  const orderIndex = mockOrders.findIndex((o) => o.id === id);
  if (orderIndex === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  mockOrders[orderIndex] = {
    ...mockOrders[orderIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(mockOrders[orderIndex]);
}
