/**
 * @file GET /api/health — Simple health check returning server status.
 * Returns { success: boolean; data: { status, timestamp, uptime } }.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
}