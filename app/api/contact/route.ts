import { NextResponse } from 'next/server';
import { database } from '../../firebase/config';
import { ref, push, set } from 'firebase/database';
import { RateLimiter } from 'limiter';

// Create a rate limiter: 5 requests per hour
const limiter = new RateLimiter({ tokensPerInterval: 5, interval: "hour" });

// Validate email function
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  // Check if we have tokens available
  const hasToken = await limiter.removeTokens(1);
  if (!hasToken) {
    return NextResponse.json({ message: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  const data = await request.json();
  
  // Validate input data
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
  }

  if (data.message.length > 1000) {
    return NextResponse.json({ message: 'Message is too long (max 1000 characters)' }, { status: 400 });
  }

  try {
    const contactRef = ref(database, 'contacts');
    const newContactRef = push(contactRef);
    await set(newContactRef, {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({ message: 'Contact request submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting contact request:', error);
    return NextResponse.json({ message: 'Failed to submit contact request' }, { status: 500 });
  }
}