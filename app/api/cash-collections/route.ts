import { NextResponse } from 'next/server';
import { mockCashCollections } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockCashCollections);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCollection = {
    id: `CC${String(mockCashCollections.length + 1).padStart(3, '0')}`,
    submittedAt: new Date().toISOString(),
    status: 'pending' as const,
    ...body,
  };
  mockCashCollections.push(newCollection);
  return NextResponse.json(newCollection, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  const collectionIndex = mockCashCollections.findIndex((c) => c.id === id);
  if (collectionIndex === -1) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  mockCashCollections[collectionIndex] = {
    ...mockCashCollections[collectionIndex],
    ...updates,
  };

  return NextResponse.json(mockCashCollections[collectionIndex]);
}
