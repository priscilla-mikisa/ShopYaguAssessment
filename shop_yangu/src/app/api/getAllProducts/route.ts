import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;


export async function GET() {
  try {
    const response = await fetch(`${baseURL}/Products`);
    if (!response.ok) {
      throw new Error('Failed to fetch Products');
    }

    const products = await response.json();
    return NextResponse.json(products); 
  } catch (error) {
    console.error('Error fetching Products:', error);
    return NextResponse.json({ error: 'Failed to fetch Products' }, { status: 500 });
  }
}
