import { NextResponse } from 'next/server';
import { mockDrivers } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockDrivers);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  const driverIndex = mockDrivers.findIndex((d) => d.id === id);
  if (driverIndex === -1) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
  }

  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    ...updates,
  };

  return NextResponse.json(mockDrivers[driverIndex]);
}
