import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;


export async function GET() {
  try {
    const response = await fetch(`${baseURL}/Shops`);
    if (!response.ok) {
      throw new Error('Failed to fetch Shops');
    }

    const shops = await response.json();
    return NextResponse.json(shops); 
  } catch (error) {
    console.error('Error fetching Shops:', error);
    return NextResponse.json({ error: 'Failed to fetch Shops' }, { status: 500 });
  }
}
