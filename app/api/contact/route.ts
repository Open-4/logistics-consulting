/**
 * @file POST /api/contact — Receive contact form and chat widget messages.
 * Returns { success: boolean; data?: T; error?: string }.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, source } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 },
      );
    }

    console.log('[Contact]', {
      source: source || 'contact_form',
      name: name || '(anonymous)',
      email: email || '(not provided)',
      company: company || '(not provided)',
      message: message.slice(0, 200),
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: { received: true, timestamp: new Date().toISOString() },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    );
  }
}