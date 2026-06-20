/**
 * @file POST /api/subscribe-alert — Subscribe to route alerts.
 * Receives { routes: {origin, destination}[], email }.
 */
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { routes, email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    if (!routes || !Array.isArray(routes) || routes.length === 0) {
      return NextResponse.json({ success: false, error: 'At least one route is required' }, { status: 400 });
    }

    console.log('[Alert] New subscription:', { email: email.trim(), routes: routes.length });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}